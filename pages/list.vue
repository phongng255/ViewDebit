<template>
  <div id="content">
    <div class="page-heading">
      <h3>Danh Sách Đóng Tiền Hôm Nay</h3>
    </div>
    <!-- Content -->
    <div class="page-content">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            Danh Sách
          </div>
          <div class="card-body">
            <DataTables :settings="datatables" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'user',
  data () {
    return {
      loading: true,
      datatables: {
        columns: [
          { data: 'item', title: 'Sản Phẩm' },
          {
            data: 'money',
            title: 'Số Tiền',
            render: value => parseFloat(value).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })
          },
          { data: 'name', title: 'Tên' },
          {
            data: 'createdAt',
            title: 'Ngày Tạo',
            render: date => new Date(date).toLocaleString()
          }
        ],
        url: '/Accumulate/GetDateNow'
      }
    }
  },
  head () {
    return {
      title: 'List'
    }
  },
  methods: {
  }
}
</script>
