<template>
    <div id="show-style">
        <div class="style-content" id="style_content">
            <pre class="style-code" v-html="styleMsg"></pre>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                msg:'hello vue',
                styleMsg:""
            }
        },
        methods:{
            writeStyleCode: function (code) {
                this.styleMsg = code;
                // 每写一行 code ，滚动条滚动到最下面
                document.getElementById('style_content').scrollTop = document.getElementById('style_content').scrollHeight
            }
        }
    }
</script>

<style>
    #show-style{
        position: relative;
        float: left;
        width: 25%;
        height: 100%;
        padding: 1rem 2rem;
        box-sizing: border-box;
        background: #ffffff;
    }
    .style-content{
        position: relative;
        width: 100%;
        height: 99%;
        overflow: auto;
        box-shadow: 0 4px 12px 0 rgba(0,0,0,0.5);
    }
    .style-content::-webkit-scrollbar {
        display: none;
    }
    .style-code{
        margin: 1rem 0;
    }
</style>
