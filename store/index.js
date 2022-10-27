export const state = () => ({
  userSidebars: [
    {
      name: 'Menu',
      isTitle: true
    },
    {
      name: 'Trang chủ',
      url: '/',
      icon: 'grid-fill'
    },
    {
      name: 'Đóng Tiền Hôm Nay',
      url: '/list',
      icon: 'grid-fill'
    },
    {
      name: 'Khách Hàng',
      url: '/customer',
      icon: 'grid-fill'
    },
    {
      name: 'Đã Hoàn Tất',
      url: '/debitSuccess',
      icon: 'grid-fill'
    },
    {
      name: 'Đang Còn Nợ',
      url: '/debitProcess',
      icon: 'grid-fill'
    }
  ]
})
