<template>
    <div>
        <a href="javascript:void(0)" @click="showPdf">chak pdf 文件</a>

        <!--<c-pdf @closepdf="closepdf" v-if="isshowpdf" :pdfurl="testpdfurl"></c-pdf>-->
    </div>
</template>

<script>
export default {
    data() {
      return {
          // isshowpdf:false,
          // testpdfurl:'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
      }
    },
    mounted () {
        //this.showPdf();
    },
    methods: {
        showPdf() {
            alert("1")
            //this.$showPDF('http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf');
        },
        closepdf(){
            //this.isshowpdf=false;
        },
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
div.views-pdf-pdf{
    padding: 0.3rem;
    //background: url("../pdf/pdf.pdf");
}
</style>