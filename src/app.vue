<template>
  <div id="app">
    <div v-if="isMobile" id="scroll-top"></div>


    <!--<router-link to="/spa/news">news</router-link>   <router-link to="/spa/list">list</router-link>-->

    <!--<router-link to="/spa/login">login</router-link>-->


    <!--<keep-alive>-->
      <!--<router-view v-if="this.$route.meta.keepAlive"></router-view>-->
    <!--</keep-alive>-->
    <!--<router-view v-if="!this.$route.meta.keepAlive"></router-view>-->
    <!--<keep-alive>-->
      <!--<router-view ></router-view>-->
    <!--</keep-alive>-->
    <router-view></router-view>



  </div>
</template>

<script>
  const ua = navigator.userAgent;
  const isMobile = ua.indexOf('Android') >= 0 || ua.indexOf('iPhone') >= 0;
  const style = document.createElement('style');
  style.type = 'text/css';

  if (isMobile) {
    // 输入框在虚拟键盘弹出时，自动滚动到可见位置
    document.body.addEventListener('click', function (event) {
      var element = event.target;
      var tags = {
        'INPUT': 1,
        'TEXTAREA': 1,
      }
      if ((element.tagName in tags) ) {
        setTimeout(function(){
          element.scrollIntoViewIfNeeded();
        }, 400);
      }
    }, false);

    // rem 布局计算
    (function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);

    style.innerHTML = `
      html, body { color: #212121; position: relative; height: 100%; width: 100%; overflow-x: hidden; -webkit-overflow-scrolling: touch; }
      * { -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-touch-callout: none; }
      p { margin: 1em 0; }
      body #app { height: 100%;}
      body #app #scroll-top { height: 1px; top: 0px; position: absolute; }
      body .mint-msgbox { border-radius: 7px;}
      body .mint-msgbox .mint-msgbox-btn { font-size: 16px; }
      body .mint-msgbox .mint-msgbox-confirm { color: #fff; background-color: #45aa9c;}
      body .mint-msgbox .mint-msgbox-cancel { color: #45aa9c; }
    `;
  }
  else {
    style.innerHTML = `
      * { margin: 0; padding: 0; }
    `;

  }

  document.head.appendChild(style);

  export default {

    data () {
      return {
        isMobile : isMobile,
      }
    },
      mounted(){
          //console.log(!this.$route.meta.keepAlive)
      }
  }

</script>
