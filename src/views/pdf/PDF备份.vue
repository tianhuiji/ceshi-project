<template>
    <div class="views-pdf-pdf">
        <h1>pdffff</h1>

        <div>
            <a href="javascript:void(0)" target="_blank" @click="showPdf()">显示pdf文档</a>
            <!--
            https://ecs7.tokopedia.net/instant-loan/file/29a2218e-bef9-44cb-b92b-8e81bc4d5228_DOC-20171013-WA0035.pdf
            http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf
            -->
            <!--<iframe src="http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf" width="100%" height="100%">-->
            <!--</iframe>-->
        </div>
        <br>
        <div>
            <pdf src="http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf"></pdf>
        </div>
    </div>
</template>

<script>
    //  import pdf from 'vue-pdf'
    //
    // export default {
    //     name: "PDF",
    //     components: {
    //         pdf
    //     },
    //     methods: {
    //         showPdf() {
    //             var url = "../pdf/pdf.pdf";
    //             //window.open('http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf');
    //             //window.open('pdf.pdf');
    //
    //
    //         }
    //     }
    // }

    //import pdf from 'vue-pdf'

    export default {
        components: {

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
div.views-pdf-pdf{
    padding: 0.3rem;
    //background: url("../pdf/pdf.pdf");
}
</style>