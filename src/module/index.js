module.exports = function () {
    var str;

    str =  `

<div class="footer">
  <div class="container">
    <div class="left-container">
      <div class="content top gray-20">
        <a class="alink" href="/instalment">我要分期</a>
        <a class="alink" href="/merchant">线下商户</a>
        <a class="alink" href="/online">线上合作</a>
        <a class="alink" href="/aboutus">联系我们</a>
      </div>
      <div class="content gray-16">
      `

        if (location.host === 'localhost:8080'){

        str += `
        <div style="">
         <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010102003383" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#626262;">京公网安备 11010102003383号</p></a>
        </div>
        `;
        }else {
        str += `
            <div style="display:block;" class="copyright">&copy;Copyright <span id="copy-year"><script>document.write(new Date().getFullYear())</script></span> 天津普惠商业保理有限公司</div>
        <div style="display:block;">津ICP备16003902号-1</div>
        `;
        }


         str +=  `
        
        
        
      </div>
    </div>
    <div class="right-container">
      <div class="left-box">
        <div class="service gray-16">客服电话 工作日 09:00 - 18:00</div>
        <div class="phonenum gray-30">400-1002-924</div>
      </div>
      <div class="right-box clearfix">
        <div class="qr-code"></div>
        <div class="title gray-12">任买微信公众号</div>
      </div>
    </div>
  </div>
 
</div>

  `;

    return str;
}