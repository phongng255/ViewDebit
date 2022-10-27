<template>
  <div id="content">
    <div class="page-heading">
      <div class="d-flex justify-content-between">
        <h3 class="page-title">
          Danh Sách Thanh Toán Hoàn Tất
        </h3>
      </div>
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
          { data: 'items', title: 'Tên Hàng' },
          {
            data: 'money',
            title: 'Số Tiền',
            render: value => parseFloat(value).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })
          },
          { data: 'createdAt', title: 'Ngày Tạo', render: date => new Date(date).toLocaleString() },
          { data: 'dateComplete', title: 'Hoàn Tất', render: date => new Date(date).toLocaleString() },
          { data: 'customer.name', title: 'Tên Khách' }
        ],
        url: '/Debit/GetDebitSuccess'
      },
      customer: {
        name: null,
        phoneNumber: null
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
