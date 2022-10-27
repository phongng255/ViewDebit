<template>
  <div id="datatables.net">
    <table id="datatables" class="table table-reponsive nowrap" />
  </div>
</template>

<script>
import $ from 'assets/vendors/datatables/datatables.js'
import 'assets/vendors/datatables/datatables.css'

export default {
  props: {
    settings: {
      classEvent: {
        type: Array
      },
      columns: {
        type: Array
      },
      url: {
        type: String
      },
      default () {
        return {
          classEvent: [],
          columns: [],
          url: null
        }
      },
      type: Object
    }
  },
  data () {
    return {
      dataTable: null,
      processing: true,
      serverSide: true,
      ordering: true,
      responsive: true,
      pagingType: 'numbers'
    }
  },
  mounted () {
    if (this.dataTable == null) {
      this.$nextTick(() => {
        this.loadTable()
        this.settings.classEvent?.forEach((element) => {
          $('#datatables tbody').on('click', `td.${element}`, (e) => {
            const data = this.dataTable.row(e.target.closest('tr')).data()
            this.$emit('click', { className: element, row: data })
          })
        })
      })
    }
  },
  methods: {
    reload () {
      this.dataTable.ajax.reload()
    },
    async customLoader (data) {
      try {
        const response = await this.$callapi.post(this.settings.url, data)
        return response
      } catch (e) {
        this.$toast.error('Error while retrieving data')
        return {
          draw: data.draw,
          recordsFiltered: 0,
          recordsTotal: 0,
          data: []
        }
      }
    },
    loadTable () {
      if (this.dataTable != null) {
        return
      }
      this.dataTable = $('#datatables').DataTable({
        processing: this.processing,
        serverSide: this.serverSide,
        ordering: this.ordering,
        responsive: this.responsive,
        pagingType: this.pagingType,
        scrollX: true,
        ajax: (data, callback, settings) => {
          this.customLoader(data).then((result) => {
            callback(result)
          })
        },
        columns: this.settings.columns
      })

      $('.burger-btn').click(() => {
        this.dataTable.columns.adjust()
      })
    }
  }
}
</script>
