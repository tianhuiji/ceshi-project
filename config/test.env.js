var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  spaRootPath: JSON.stringify('/spa'),
  apis: JSON.stringify({
    default: {
      path: '/bestbuy-app-server-cloud-server',
      proxy: 'https://app.renyimai.com.cn'
    }
  })
})
