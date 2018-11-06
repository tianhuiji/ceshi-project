<template>
    <div class="views-click-clickhome">
        <h2>方法1</h2>
        <br>
        <a href="####" @click="showPopup">开启窗口</a>
        <br>
        <br>
        <c-popup v-show="hide" @homeSildeHide="homeSildeHide1" :lable="title" :hide="hide" ></c-popup>
        <br>
        <h2>方法2</h2>
        <a href="####" @click="showPopup2">开启窗口2</a>
        <br>
        <c-popup2 :visible.sync = 'visible'></c-popup2>

        <br>
        <h2>测试-click.native</h2>

        <c-click-native data-type="ceshi--" ref="clicknative" @click.native="clickNative()" :class="isBorderFocus ? 'redborder' : ''"></c-click-native>


        <br>
    </div>
</template>

<script>
    import cPopup from  'components/click/Popup';
    import cPopup2 from  'components/click/Popup2';

    import cClickNative from  'components/click/ClickNative';

    export default {
        name: "home",
        data(){
          return {
              hide:false,
              visible:false,
              isBorderFocus:false,
              title:"这是clickhome内容"
          }
        },
        methods:{
            showPopup(){
                this.hide = true;
            },
            homeSildeHide1(){
                this.hide = false;
            },
            showPopup2(){
                this.visible = true;
            },
            clickNative(){
                this.isBorderFocus = true;
                //console.log(this.$refs.clicknative.$attrs['data-type'])
                //console.log(this.$refs.clicknative.getVal())
                console.log(this.$refs.clicknative.input)
            }
        },
        components:{
            cPopup,
            cPopup2,
            cClickNative
        }

    }
</script>

<style lang="scss" ref="stylesheet/scss" scoped>
.views-click-clickhome{
    padding: 0.3rem;
    h2{
        padding: 0px;
        margin: 0px;
    }
}
</style>