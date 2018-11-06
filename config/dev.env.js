var merge = require('webpack-merge')

module.exports = merge(require('./prod.env'), {
  NODE_ENV: '"development"',
  spaRootPath: '"/spa"',
  apis: JSON.stringify({
    default: {
      path: '/bestbuy-app-server-cloud-server',
      proxy: 'https://app.renyimai.com.cn'
    }
  })
})



// var merge = require("webpack-merge");
// var prodEnv = require("./prod.env");
//
// module.exports = merge(prodEnv, {
//     NODE_ENV: '"development"',
//     FILE_SERVER: '"http://106.75.9.81/"',
//     spaRootPath: JSON.stringify("/spa"),
//     apis: JSON.stringify({
//         app: {
//             path: "/bestbuy-app-server-cloud-server",
//             proxy: "http://ut1.zuul.pub.puhuifinance.com:8765"
//         },
//         eggshell: {
//             path: "/bestbuy-self-cloud-server",
//             // proxy: "http://bestbuy-self-cloud-server.bestbuy.test"
//             proxy: "http://ut1.zuul.pub.puhuifinance.com:8765"
//             // proxy: 'http://t1.zuul.pub.puhuifinance.com'
//             // proxy: 'http://106.75.75.106'
//         },
//         activity: {
//             path: "/bestbuy-self-cloud-server",
//             proxy: "http://ut1.zuul.pub.puhuifinance.com:8765"
//         }
//     }),
//     quickPaymentIndexUrl: '"http://quickpayment.settlement.beta/loadIndex"'
// });
