<template>
  <div id="content">
    <div class="page-heading">
      <div class="d-flex justify-content-between">
        <h3 class="page-title">
          Trang chủ
        </h3>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNew">
          <i class="bi bi-plus-circle-dotted me-2"></i> Thêm
        </button>
      </div>
      <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="datatables"
          @input="find($event)"></label>
    </div>

    <!-- Spinner -->
    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border" style="width: 5rem; height: 5rem" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <!-- End spinner -->
    <!-- Content -->
    <div v-else class="page-content">
      <section class="row">
        <!-- <div class="col-12 col-lg-12"> -->
        <div class="col-sm-6 text-center" v-for="item in processes" :key="item?.id || null">
          <div class="card">
            <div class="card-header">
              Số Điện Thoại: {{ item?.customer.phoneNumber || null }}
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ item?.customer.name || null }}</h3>
              <p class="card-text">Số Tiền Nợ: {{ getMoney(item?.money) }}</p>
              <p class="card-text">Số Tiền Đã Đóng: {{ getMoney(item?.processMoney) }}</p>
              <a class="btn btn-primary" @click="openEditModal(item.id)">Thanh Toán</a>
            </div>
            <div class="card-footer text-muted">
              Ngày Tạo: {{ getDate(item?.createdAt) }}
            </div>
          </div>
        </div>
        <!-- </div> -->
      </section>
    </div>
    <div id="addNew" class="modal fade" tabindex="-1" aria-labelledby="addNewLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="addNewLabel" class="modal-title">
              Thêm Nợ
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card-content">
              <!-- <div class="card-header">
                <h4 class="card-title">Horizontal Form</h4>
              </div> -->
              <div class="card-body">
                <form class="form form-horizontal" @submit.prevent="createDebit()">
                  <div class="form-body">
                    <div class="row">
                      <div class="col-md-4">
                        <label>Khách hàng</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <v-select v-model="customer" label="name" code="id" :options="customers"></v-select>
                      </div>
                      <div class="col-md-4">
                        <label>Số điện thoại</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <input type="text" class="form-control" placeholder="Số điện thoại"
                          :value="customer?.phoneNumber" disabled>
                      </div>
                      <div class="col-md-4">
                        <label>Sản phẩm</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <input v-model="debit.items" type="text" class="form-control" placeholder="Sản phẩm">
                      </div>
                      <div class="col-md-4">
                        <label>Số tiền</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <input id="currency-field" type="text" name="currency-field" class="form-control"
                          placeholder="Số tiền" @input="DocTienBangChu($event)" />
                      </div>
                      <div class="col-md-4">
                        <label>Số tiền Bằng Chữ</label>
                      </div>
                      <div class="col-md-8 form-group" role="alert" style="color:red">
                        {{ money }}
                      </div>
                      <div class="col-sm-12 d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary me-1 mb-1" data-bs-dismiss="modal">
                          Lưu
                        </button>
                        <button type="reset" class="btn btn-light-secondary me-1 mb-1" data-bs-dismiss="modal">
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

    <div id="editItem" class="modal fade" tabindex="-1" aria-labelledby="editItemLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="editItemLabel" class="modal-title">
              Sửa
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card-content">
              <!-- <div class="card-header">
                <h4 class="card-title">Horizontal Form</h4>
              </div> -->
              <div class="card-body">
                <form class="form form-horizontal" @submit.prevent="createAccumulate()">
                  <div class="form-body">
                    <div class="row">
                      <div class="col-md-4">
                        <label>Khách hàng</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <input type="text" class="form-control" placeholder="Số điện thoại"
                          :value="process.customer.name" disabled>
                      </div>
                      <div class="col-md-4">
                        <label>Số điện thoại</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <input type="text" class="form-control" placeholder="Số điện thoại"
                          :value="process.customer.phoneNumber" disabled>
                      </div>
                      <div class="col-md-4">
                        <label>Ngày tạo</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <input type="text" class="form-control" placeholder="Ngày tạo"
                          :value="getDate(process.createdAt)" disabled>
                      </div>
                      <div class="col-md-4">
                        <label>Sản phẩm</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <input v-model="process.items" type="text" class="form-control" placeholder="Sản phẩm" disabled>
                      </div>
                      <div class="col-md-4">
                        <label>Tổng tiền</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <input v-model="process.money" type="number" class="form-control" placeholder="Tổng tiền"
                          disabled>
                      </div>
                      <div class="col-md-4">
                        <label>Tiền đã trả</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <input v-model="process.processMoney" type="number" class="form-control"
                          placeholder="Tiền đã trả" disabled>
                      </div>
                      <div class="col-md-4">
                        <label>Tiền thanh toán</label>
                      </div>
                      <div class="col-md-8 form-group">
                        <input id="money" type="text" name="money" class="form-control" placeholder="Tiền thanh toán"
                          @input="DocTienBangChu($event)">
                      </div>
                      <div class="col-md-4">
                        <label>Số tiền Bằng Chữ</label>
                      </div>
                      <div class="col-md-8 form-group" role="alert">
                        {{ money }}
                      </div>
                      <div class="col-sm-12 d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary me-1 mb-1">
                          Lưu
                        </button>
                        <button type="reset" class="btn btn-light-secondary me-1 mb-1" data-bs-dismiss="modal">
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
import $ from 'jquery'
import bootstrap from '@/plugins/bootstrap'
export default {
  layout: 'user',
  data() {
    return {
      loading: true,
      money: '',
      ChuSo: [' không ', ' một ', ' hai ', ' ba ', ' bốn ', ' năm ', ' sáu ', ' bảy ', ' tám ', ' chín '],
      Tien: ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ'],
      value: '',
      processes: [this.process],
      customers: [this.customer],
      customer: {
        id: null,
        name: null,
        phoneNumber: null
      },
      debit: {
        customerId: null,
        items: null,
        money: null
      },
      process: {
        id: null,
        customerId: null,
        items: null,
        money: 0,
        processMoney: 0,
        createdAt: null,
        dateComplete: null,
        status: null,
        customer: {
          id: null,
          name: null,
          phoneNumber: null
        },
        accumulateMoney: null
      }
    }
  },
  head() {
    return {
      title: 'Trang chủ'
    }
  },
  async mounted() {
    this.processes = await this.getProcesses()
    this.customers = await this.getCustomers()
    this.loading = false
  },
  methods: {
    openEditModal(id) {
      this.process = this.processes.find(x => x.id === id)
      const modal = new bootstrap.Modal(document.getElementById('editItem'), {})
      modal.show()
    },
    getMoney(value) {
      const num = value || 0
      return (num).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
      })
    },
    getDate(value) {
      const date = new Date(value)
      return `${date.toLocaleString()}`
    },
    async getProcesses() {
      try {
        const respone = await this.$callapi.get('/Debit/GetDebitProcess')
        return respone
      } catch (e) {
        this.$toast.error(e.data.message || 'Có lỗi trong quá trình tải dữ liệu')
      }
      return undefined
    },
    async getCustomers() {
      try {
        const respone = await this.$callapi.get('/Customer/GetAllCustomer')
        return respone
      } catch (e) {
        this.$toast.error(e.data.message || 'Có lỗi trong quá trình tải dữ liệu')
      }
      return undefined
    },
    async createDebit() {
      try {
        this.debit.customerId = this.customer.id
        const response = await this.$callapi.post('/Debit/CreateDebit', this.debit)
        this.$toast.success('Tạo phiếu nợ thành công!')
        $('#currency-field').value = null
        this.money = null
        this.customer = null
        this.debit.customerId = null
        this.debit.items = null
        this.debit.money = null
        this.processes.unshift(response)
      } catch (e) {
        this.$toast.error(e.data.message || 'Có lỗi trong quá trình tải dữ liệu')
      }
      return undefined
    },
    async createAccumulate() {
      const payload = {
        debitId: this.process.id,
        money: this.process.accumulateMoney
      }
      const response = await this.$callapi.post('/Accumulate/CreateAccumulate', null, payload)
      this.process.accumulateMoney = null
      if (response.status) {
        this.$toast.success('Phiếu nợ đã hoàn tất!')
        this.processes = this.processes.filter(x => x.id !== this.process.id)
        const myModal = document.getElementById('editItem')
        const modal = bootstrap.Modal.getInstance(myModal)
        modal.hide()
      } else {
        this.$toast.success('Thêm tổng tiền thành công!')
        this.process.processMoney = response.processMoney
      }
    },
    DocSo3ChuSo(baso) {
      let tram = ''
      let chuc = ''
      let donvi = ''
      let KetQua = ''
      tram = parseInt(baso / 100)
      chuc = parseInt((baso % 100) / 10)
      donvi = baso % 10
      if (tram === 0 && chuc === 0 && donvi === 0) { return '' }
      if (tram !== 0) {
        KetQua += this.ChuSo[tram] + ' trăm '
        if ((chuc === 0) && (donvi !== 0)) { KetQua += ' linh ' }
      }
      if ((chuc !== 0) && (chuc !== 1)) {
        KetQua += this.ChuSo[chuc] + ' mươi'
        if ((chuc === 0) && (donvi !== 0)) { KetQua = KetQua + ' linh ' }
      }
      if (chuc === 1) { KetQua += ' mười ' }
      switch (donvi) {
        case 1:
          if ((chuc !== 0) && (chuc !== 1)) {
            KetQua += ' mốt '
          } else {
            KetQua += this.ChuSo[donvi]
          }
          break
        case 5:
          if (chuc === 0) {
            KetQua += this.ChuSo[donvi]
          } else {
            KetQua += ' lăm '
          }
          break
        default:
          if (donvi !== 0) {
            KetQua += this.ChuSo[donvi]
          }
          break
      }
      return KetQua
    },
    DocTienBangChu(e) {
      const teampMoney = e.target.value
      const SoTien = teampMoney.replace(/,/g, '')
      const teamp = $('#currency-field')
      const teamp2 = $('#money')
      this.debit.money = SoTien
      this.process.accumulateMoney = SoTien
      this.formatCurrency(teamp)
      this.formatCurrency(teamp2)
      let lan = 0
      let i = 0
      let so = 0
      let KetQua = ''
      let tmp = ''
      const ViTri = []
      if (SoTien < 0) { return 'Số tiền âm !' }
      if (SoTien === 0) { return 'Không đồng !' }
      if (SoTien > 0) {
        so = SoTien
      } else {
        so = -SoTien
      }
      if (SoTien > 8999999999999999) {
        // SoTien = 0;
        return 'Số quá lớn!'
      }
      ViTri[5] = Math.floor(so / 1000000000000000)
      if (isNaN(ViTri[5])) { ViTri[5] = '0' }
      so = so - parseFloat(ViTri[5].toString()) * 1000000000000000
      ViTri[4] = Math.floor(so / 1000000000000)
      if (isNaN(ViTri[4])) { ViTri[4] = '0' }
      so = so - parseFloat(ViTri[4].toString()) * 1000000000000
      ViTri[3] = Math.floor(so / 1000000000)
      if (isNaN(ViTri[3])) { ViTri[3] = '0' }
      so = so - parseFloat(ViTri[3].toString()) * 1000000000
      ViTri[2] = parseInt(so / 1000000)
      if (isNaN(ViTri[2])) { ViTri[2] = '0' }
      ViTri[1] = parseInt((so % 1000000) / 1000)
      if (isNaN(ViTri[1])) { ViTri[1] = '0' }
      ViTri[0] = parseInt(so % 1000)
      if (isNaN(ViTri[0])) { ViTri[0] = '0' }
      if (ViTri[5] > 0) {
        lan = 5
      } else if (ViTri[4] > 0) {
        lan = 4
      } else if (ViTri[3] > 0) {
        lan = 3
      } else if (ViTri[2] > 0) {
        lan = 2
      } else if (ViTri[1] > 0) {
        lan = 1
      } else {
        lan = 0
      }
      for (i = lan; i >= 0; i--) {
        tmp = this.DocSo3ChuSo(ViTri[i])
        KetQua += tmp
        if (ViTri[i] > 0) { KetQua += this.Tien[i] }
        if ((i > 0) && (tmp.length > 0)) { KetQua += ',' }// && (!string.IsNullOrEmpty(tmp))
      }
      if (KetQua.substring(KetQua.length - 1) === ',') {
        KetQua = KetQua.substring(0, KetQua.length - 1)
      }
      KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2) + ' Đồng'
      this.money = KetQua
    },
    formatNumber(n) {
      return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    formatCurrency(input, blur) {
      console.log(input)
      let inputVal = input.val()
      if (inputVal === '') { return }
      const originalLen = inputVal.length
      let caretPos = input.prop('selectionStart')
      if (inputVal.includes('.')) {
        const decimalPos = inputVal.indexOf('.')
        let leftSide = inputVal.substring(0, decimalPos)
        let rightSide = inputVal.substring(decimalPos)
        leftSide = this.formatNumber(leftSide)
        rightSide = this.formatNumber(rightSide)
        if (blur === 'blur') {
          rightSide += '00'
        }
        rightSide = rightSide.substring(0, 2)
        inputVal = leftSide + '.' + rightSide
      } else {
        inputVal = this.formatNumber(inputVal)
      }
      input.val(inputVal)
      const updatedLen = inputVal.length
      caretPos = updatedLen - originalLen + caretPos
      input[0].setSelectionRange(caretPos, caretPos)
    },
    async find(e) {
      this.value = e.target.value
      try {
        this.processes = null
        const payload = {
          value: this.value
        }
        if (this.value != "") {
          const respone = await this.$callapi.post('/Debit/FindDebitProcess',null,payload)
          this.processes = await respone;
        }
        else{
          this.processes = await this.getProcesses()
        }
      } catch (e) {
        this.$toast.error(e.data.message || 'Có lỗi trong quá trình tải dữ liệu')
      }
      return undefined
    }
  }
}
</script>
