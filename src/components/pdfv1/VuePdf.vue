<template>
    <div id = "container" class="components-pdf" :class = "{'back': isShow}" v-if="isShow">
        <canvas id = "the-canvas" class="canvasbox"></canvas>
        <!-- / / 添加关闭pdf功能-->
        <span :class = "{'close':isShow}" @click = "closePdf" > close </span>
        <p class="foot" v-if="pdfDoc">
            <button class="left" @click="onPrevPage" v-if="pageNum>1">上一页</button >
            <button class = "right"@click = "onNextPage" v-if = "pageNum<pdfDoc.numPages" > 下一页 </button>
        </p >
    </div>
</template>

<script>
    import PDFJS from 'pdfjs-dist';

    export default {
        name: "VuePdf",
        data() {
            return {
                isShow: false,
                //通过该属性动态添加类，让pdf显示或隐藏
                pdfDoc: null,
                //可以打印发现是一个对象，里面有页数信息等
                pageNum: 1,
                pageRendering: false,
                pageNumPending: null,
                scale: 1
            }
        },
        methods: {
            closePdf() {
                this.isShow = false;
            },
            showPDF(url) {
                this.isShow = true;
                let _this = this;

                PDFJS.getDocument(url).then(function(pdf) {
                    _this.pdfDoc = pdf;

                    _this.renderPage(1);
                });
            },
            renderPage(num) {
                this.pageRendering = true;
                let _this = this;

                this.pdfDoc.getPage(num).then(function(page) {
                    var viewport = page.getViewport(_this.scale);
                    let canvas = document.getElementById('the-canvas');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width; // Render PDF page into canvas context
                    var renderContext = {
                        canvasContext: canvas.getContext('2d'),
                        viewport: viewport
                    };
                    var renderTask = page.render(renderContext); // Wait for rendering to finish
                    renderTask.promise.then(function() {
                        _this.pageRendering = false;
                        if (_this.pageNumPending !== null) {
                            // New page rendering is pending
                            this.renderPage(_this.pageNumPending);
                            _this.pageNumPending = null;
                        }
                    })
                })
            },
            queueRenderPage(num) {
                if (this.pageRendering) {
                    this.pageNumPending = num;
                } else {
                    this.renderPage(num);
                }
            },
            onPrevPage() {
                if (this.pageNum <= 1) {
                    return
                }
                this.pageNum--;
                this.queueRenderPage(this.pageNum);
            },
            onNextPage() {
                if (this.pageNum >= this.pdfDoc.numPages) {
                    return
                }
                this.pageNum++;
                this.queueRenderPage(this.pageNum);
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
div.components-pdf{
    &.back {
        position:fixed;
        width: 100%;
        height: 100%;
        top: 0; left: 0;
        /*text-align: center;*/
        /*padding: 20px;*/
        z-index: 100;
        overflow: scroll;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .close{
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 200;
        color: #fff;
        cursor: pointer;
        background-color: red;
    }
    .foot {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translate(-50%,0);

        &>button{
            margin-right: 10px;
            background-color: rgba(12,9,9,0.51);
        }
    }
    .canvasbox{
        width: 100%;
        height: 100%;
    }
}

</style>