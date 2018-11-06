/**
 * Created by hanan on 17/7/31.
 */

const env = process.env.env;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

if (env == 'production') {
  require('./prod-server')
}
else {
  require('./test-server')
}