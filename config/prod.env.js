module.exports = {
  NODE_ENV: '"production"',
  spaRootPath: JSON.stringify('/spa'),
  apis: JSON.stringify({
    default: {
      path: '/bestbuy-app-server-cloud-server',
      proxy: 'https://app.renyimai.com.cn'
    }
  })
}
