// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import routes from './routes';
import storeOption from './vuex/store';
import App from './app';




/*
* pdf-demo1
* */
// import pdf from './components/pdf';
// Vue.use(pdf);
/*
    运用
    this.$showPDF('http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf');
* */


/*
* pdf-demo2
* */
// import pdf from 'vue-pdf';
// Vue.use(pdf);

/*
* pdf-demo3
* */
// import CPdf from './components/pdfv2/pdfv2';
// Vue.component(CPdf.name, CPdf);
/*
    使用：在想预览pdf文件的组件里面

    <c-pdf @closepdf="closepdf" v-show="isshowpdf" :pdfurl="testpdfurl"></c-pdf>

    data() {
        return {

            isshowpdf:false,
            testpdfurl:'//cdn.mozilla.net/pdfjs/tracemonkey.pdf'
        }
    },
    methods: {

        closepdf(){
            this.isshowpdf=false
        },
    }

*/


/*
*
* pdf-demo4 (v1)
* */
import pdf from './components/pdfv1'
Vue.use(pdf);






Vue.use(Vuex);
Vue.use(VueRouter);

// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  mode: 'history',
  routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            };
        } else {
            return { x: 0, y: 0 };
        }
    }
});

router.afterEach((to, from, next) => {
    document.title = to.name;
});

// 创建一个 store 对象用于管理应用状态
const store = new Vuex.Store(storeOption);

window.$app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});