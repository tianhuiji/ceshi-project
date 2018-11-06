/**
 * Created by hanan on 16/11/22.
 */

import axios from "axios";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";

axios.jsonConfig = {
  headers: { "Content-Type": "application/json; charset=UTF-8" },
  transformRequest: [
    function(data) {
      return JSON.stringify(data);
    }
  ]
};

// if token is out of date, add a response interceptor to go to log in page
axios.interceptors.response.use(
  function(response) {
    if (
      response.data &&
      (response.data.code == "11114" || response.data.code == "20006")
    ) {
      //token失效
      //TODO-由于app端token长期有效，不对router来源做判断,所以目前只有蛋壳流程适用
      if (localStorage.getItem("userTokenForOrderSubmit")) {
        localStorage.removeItem("userTokenForOrderSubmit");
      }
      if (localStorage.getItem("userTokenForOrderList")) {
        localStorage.removeItem("userTokenForOrderList");
      }
      Toast({
        message: "未登录"
      });
      $app.$router.push({
        name: "登录",
        query: {
          next: $app.$route.name
        }
      });
    } else {
      return response;
    }
  },
  function(error) {
    Indicator.close();
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // alert("401");
          // Toast({
          //   message: "未登录"
          // });
          $app.$router.push({
            name: "登录",
            query: {
              next: $app.$route.name
            }
          });
          return;
        case 404:
          Toast({
            message: "404 您要访问的页面不存在"
          });
          return;
        case 500:
          Toast({
            message: "500 服务器异常"
          });
          return;
        default:
          Toast({
            message: error.message
          });
          return;
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
