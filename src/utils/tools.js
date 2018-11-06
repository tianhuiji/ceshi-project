'use strict';

module.exports = {

  /**
   * 数字精确到小数点后两位
   * @param floatNumber
   * @returns {string}
   */
  fixedFloat2: function (floatNumber) {
    if(floatNumber) {
      if (typeof floatNumber == 'string') {
        floatNumber = parseFloat(floatNumber, 10);
      }
      return parseFloat(Math.round(floatNumber * 100) / 100, 10).toFixed(2);
    }
    return '0';
  },

  /**
   * 数字千分符保留整数
   * @param number
   * @returns {string}
   */
  commaInteger: function (number) {
    number = parseInt(number, 10);
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  /**
   * 数字千分符保留小数
   * @param number
   * @returns {string}
   */
  commaFloat: function (number) {
    if(number) {
      try {
        return this.fixedFloat2(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } catch (e) {
        console.log(e);
      }
    }
    return '0.00';
  },

  /**
   * 获取大写金额
   * @param priceStr
   * @returns {*}
   */
  getChinesePrice: function (priceStr) {
    if(priceStr) {
      try {
        var strOutput = '';
        var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
        priceStr = this.fixedFloat2(priceStr).toString();
        if(priceStr.indexOf('.') != -1) {
          priceStr = priceStr.replace('.', '');
        }
        strUnit = strUnit.substr(strUnit.length - priceStr.length);
        for (var i=0; i < priceStr.length; i++)
          strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(priceStr.substr(i,1),1) + strUnit.substr(i,1);
        return strOutput.replace(/零角零分$/, '整')
          .replace(/零[仟佰拾]/g, '零')
          .replace(/零{2,}/g, '零')
          .replace(/零([亿|万])/g, '$1')
          .replace(/零+元/, '元')
          .replace(/亿零{0,3}万/, '亿')
          .replace(/^元/, "零元");
      } catch (e) {
        console.log(e);
      }
    }
    return '零元';
  },
  /**
   * 获得隐藏后的银行卡号
   * @param bankNo
   * @returns {*}
   */
  getFinalBandCardNo: function (bankNo) {
    let starstr = '';
    let starLength = bankNo.length - 4;
    for (let i = 0; i < starLength; i++) {
      starstr += '*';
    }
    return bankNo = bankNo.replace(bankNo.substring(0, starLength), `<span style="vertical-align:text-top;">` + starstr + `</span>`);
  },
  /**
   * 获得去除两边空格后的字符串值
   * @param s
   */
  getTrimmedVal: function (s) {
    if(s) {
      return s.replace(/(^\s*)|(\s*$)/g, '');
    }
    return '';
  },
  /**
   * add date format method
   */
  formatDate: function () {
    Date.prototype.Format = function (fmt) { //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
  },
  isChineseWords: function (str) {
    if(str && str.length > 0) {
      return (/^[\u4e00-\u9fa5]+$/).test(str.replace(/(^\s*)|(\s*$)/g, ''));
    }
    return false;
  },
  getSubmitTime() {
    let newDate = new Date();
    let y = newDate.getFullYear();
    let m = newDate.getMonth() + 1;
    let d = newDate.getDate();
    let h = newDate.getHours();
    let mi = newDate.getMinutes();
    let s = newDate.getSeconds();
    return y + '.' + m + '.' + d + ' ' + h + ':' + mi + ':' + s;
  },
  isCouponCode(str) {
    if(str && str.length > 0) {
      str = str.replace(/(^\s*)|(\s*$)/g, '');
      let length = str.length;
      if(length > 9 && length < 13 && !((/^[\u4e00-\u9fa5]+$/).test(str))) {
        return true;
      }
    }
    return false;
  }
};