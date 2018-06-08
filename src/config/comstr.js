/**
 * Created by nitta-honoka on 2018/5/14.
 */
export const str =  {
  code:`

     /* 又到了招聘季啦 !
        基于星云链和 vue 做了个能自动生成简历的dapp
        支持简历编辑和生成 PDF 格式的简历哦!
     ------------------------------------*/
     /* 好了,开始制作简历
        先对左边进行布局
     ------------------------------------*/
     .section-left{
         float: left;
         width: 30%;
         height: 100%;
         text-align: center;
         color: #313131;
         line-height: 1.8;

     }
     /* 右边布局
      ------------------------------------*/
     .section-right{
         float: left;
         width: 69%;
         padding: 1rem;
         box-sizing: border-box;
         background: #ffffff;

     }
     .section-left i{
     color: rgb(151, 151, 151);
     font-size: 1.5rem;

    }
    .section-left h2{
        font-size: 2.5rem;
    }
    .section-left h3{
        font-size: 2rem;
    }
    .section-left p{
        font-size: 1.5rem;
    }
    /* 头部信息
    ------------------------------------*/
    .section-left .head{
        padding-top: 2rem;
        background: rgb(236,236,236);

    }
    .head ul{
        width: 100%;
        margin: 1rem 0;
        border-top: 2px solid rgba(151, 151, 151,0.5);
        border-bottom:2px solid rgba(151, 151, 151,0.5);
    }
    .head ul li{
        float: left;
        width: 32.1%;
    }
    .head ul li + li{
        border-left: 2px solid rgba(151, 151, 151,0.5);
    }
    .section-left .item-title{
        border-bottom: 2px solid rgba(151, 151, 151,0.5);
        padding: 0 0.4rem;
    }
    /* 教育背景
    ------------------------------------*/
    .section-left .edu{
        line-height: 2;
        margin-bottom: 0.8rem;
    }
    .edu .honor-title{
        font-size: 1.8rem;
        color: #3d3d3d;
        font-weight: 500;
    }
    /* 兴趣爱好
    ------------------------------------*/
    .section-left .interest{
        margin-bottom: 0.8rem;

    }
    .section-left .inte-span{
        display: inline-block;
        font-size: 1.4rem;
        border: 1px solid rgba(151, 151, 151,0.5);
        padding: 0 1rem;
        margin: 0.2rem 1rem;
        border-radius: 1rem;
    }
    /* 技能特长
    ------------------------------------*/
    .section-left .skill{
        width: 100%;
    }
    .skill h3{
        margin-bottom: 1rem;
    }
    .skill .sk{
        position: relative;
        width: 90%;
        margin: 0 auto;
        text-align: left;
        text-indent: 1.5rem;
        font-size: 1.6rem;
    }
    .skill .sk-wrap{
        position: absolute;
        top:0;
        right: 0;
        bottom: 0;
        margin: auto 0;
        width: 70%;
        height: 1rem;
        border-radius: 0.5rem;
        background:  rgba(151, 151, 151,0.5);
    }
    .skill .sk-per{
        display: block;
        width: 90%;
        height: 100%;
        background: rgba(151, 151, 151,0.9);
        border-radius: 0.4rem;
    }

    /* 右边 博客链接
     ------------------------------------*/
    .section-right .blog-box{
        margin-bottom: 1rem;
    }
    .section-right .blog{
        float: right;
        font-size: 1.4rem;
        margin-right: 2rem;
    }
    .blog .title-name{
        font-size: 1.6rem;
    }
    .blog .title-name:after{
        content: '';
        height: 2px;
        width: 100%;
        display:block;
        margin-bottom: 2px;
    }
    .blog .link{
        line-height: 2rem;
        margin-bottom: 2px;
        padding-right: 0.5rem;

    }
    .blog .link i{
        margin-right: 1rem;
    }
    .blog .link a{
        color: #313131;
    }
    /* 工作经验
     ------------------------------------*/
    .experience{
        padding: 0.5rem;
        box-sizing: border-box;
        font-size: 1.4rem;
        margin-bottom: 1rem;
        /*box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);*/
    }
    .experience .title{
        width: 100%;
        height: 2rem;
    }
    .experience .title:after{
        content: '';
        height: 2px;
        width: 100%;
        display:block;
        margin-bottom: 2px;
        background: linear-gradient(to right, #ffffff, rgba(135, 135, 135, 0.5) 50%, #ffffff);
    }
    .title .title-name{
        font-size: 1.8rem;
        display: inline-block;
    }
    .title .title-date{
        float: right;
    }
    .experience .item-title{
        padding: 0.6rem 0;
        color: #42b983;
    }
    .experience .item-title span{
        display: inline-block;
    }
    .item-title .item-name{
        font-size: 1.6rem;
    }
    .item-title .item-skill{

    }
    .item-title .item-date{
        float: right;
    }
    .experience .item ul{
        margin-left: 1.5rem;
        list-style: circle;
    }
    .self-evaluation .title{
        margin-bottom: 1rem;
    }
    .self-evaluation p{
        line-height: 1.4;
    }
    /* 编辑结束 !!!!
       欢迎通过帮助反馈中的联系方式
       提供更多好看的设计图!!!!
     ------------------------------------*/
    `
};
