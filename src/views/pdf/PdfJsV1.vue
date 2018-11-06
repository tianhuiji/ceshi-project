<template>
    <div class="views-pdf-pdfjsv1">
        <h1>测试pdf--v1</h1>
        <button class="btnstyle" @click="showPdfv2('./static/pdf.pdf')"> 点击show</button>
        <br>
        <button class="btnstyle" @click="showPdfv1"> 点击show</button>

        <hr>
        <div style="height: 30px;"></div>
        <div v-for="item in list">
            <button :datafld="item.url" @click="showPdf(item)">{{item.name}}</button>
        </div>
        <!--<button v-for="item in list" :datafld="item.url" @click="showPdf(item)">{{item.name}}</button>-->

    </div>
</template>

<script>
    export default {
        name: "PdfJsV1",
        data() {
            return {
                list:[
                    {
                        'name': '协议pdf',
                        'url': './static/pdf.pdf'
                    },
                    {
                        'name': '合同pdf',
                        'url': 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
                    },
                ]
            }
        },
        mounted(){
            //this.init();
        },
        methods:{
            init() {
                let url = 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf';
                this.$showPDF(url)
            },
             showPdf(url) {
                //let url = 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
                // let url = 'https://ecs7.tokopedia.net/instant-loan/file/29a2218e-bef9-44cb-b92b-8e81bc4d5228_DOC-20171013-WA0035.pdf'
                 //let url = './static/pdf.pdf';
                this.$showPDF(url.url)
                 //console.log(url.url,'///')
            },
            showPdfv1() {
                let url = 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
                // let url = 'https://ecs7.tokopedia.net/instant-loan/file/29a2218e-bef9-44cb-b92b-8e81bc4d5228_DOC-20171013-WA0035.pdf'
                //let url = './static/pdf.pdf';
                this.$showPDF(url)
            },
            showPdfv2(url) {
                //let url = 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
                // let url = 'https://ecs7.tokopedia.net/instant-loan/file/29a2218e-bef9-44cb-b92b-8e81bc4d5228_DOC-20171013-WA0035.pdf'
                //let url = './static/pdf.pdf';
                this.$showPDF(url)
                //console.log(url.url,'///')
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    body,div,h1{
        padding: 0px;
        margin: 0px;
    }
div.views-pdf-pdfjsv1{
    height: 0.6rem;
    padding: 0.2rem;

    &>h1{
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.26rem;
        background-color: #ccc;
    }
    .btnstyle{
        margin-top: 20px;
        background-color: #ccc;
    }
}
</style>