<template>
  <div id="content">
    <div class="page-heading">
      <div class="d-flex justify-content-between">
        <h3 class="page-title">
          Khách Hàng
        </h3>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNew">
          <i class="bi bi-plus-circle-dotted me-2"></i> Thêm
        </button>
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
    <div id="addNew" class="modal fade" tabindex="-1" aria-labelledby="addNewLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="addNewLabel" class="modal-title">
              Thêm Khách Hàng
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card-content">
              <div class="card-body">
                <form class="form form-horizontal" @submit.prevent="createDebit()">
                  <div class="form-body">
                    <div class="row">
                      <div class="col-md-4">
                        <label>Khách hàng</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <input
                          v-model="customer.name"
                          type="text"
                          class="form-control"
                          placeholder="Tên Khách Hàng"
                        >
                      </div>
                      <div class="col-md-4">
                        <label>Số Điện Thoại</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <input
                          v-model="customer.phoneNumber"
                          type="Number"
                          class="form-control"
                          placeholder="Số Điện Thoại"
                        >
                      </div>
                      <div class="col-sm-12 d-flex justify-content-end">
                        <button
                          type="submit"
                          class="btn btn-primary me-1 mb-1"
                          data-bs-dismiss="modal"
                        >
                          Lưu
                        </button>
                        <button
                          type="reset"
                          class="btn btn-light-secondary me-1 mb-1"
                          data-bs-dismiss="modal"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
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
          { data: 'name', title: 'Tên Khách' },
          { data: 'phoneNumber', title: 'Số Điện Thoại' }
        ],
        url: '/Customer/GetAllCustomerDataTable'
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
    async createDebit () {
      try {
        const response = await this.$callapi.post('/Customer', this.customer)
        this.$toast.success('Tạo Khách Hàng Thành Công!')
      } catch (e) {
        this.$toast.error(e.data.message || 'Có lỗi trong quá trình tải dữ liệu')
      }
      return undefined
    }
  }
}
</script>
