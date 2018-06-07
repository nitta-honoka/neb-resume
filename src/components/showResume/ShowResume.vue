<template>
    <div id="show-resume">
        <div id="resume_content" class="resume-content clearfloat" :style="{width:pfdSize.width+'px',height:pfdSize.height+'px'}">
            <section class="section-left">
                <div class="head">
                    <h2>{{resumeData.head.name}}</h2>
                    <h3>求职意向:{{resumeData.head.intention}}</h3>
                    <p><i class="icon-phone icon-2x"></i></p>
                    <p>{{resumeData.head.tel}}</p>
                    <p><i class="icon-envelope-alt icon-2x"></i></p>
                    <p>{{resumeData.head.email}}</p>
                    <ul class="clearfloat">
                        <li>
                            <p>住址</p>
                            <p>{{resumeData.head.address}}</p>
                        </li>
                        <li>
                            <p>年龄</p>
                            <p>{{resumeData.head.age}}</p>
                        </li>
                        <li>
                            <p>性别</p>
                            <p>{{resumeData.head.sex}}</p>
                        </li>
                    </ul>
                </div>
                <div class="edu">
                    <h3><span class="item-title">教育背景</span></h3>
                    <p>{{resumeData.head.school}} ({{resumeData.head.graduation}})</p>
                    <p>{{resumeData.head.graduationTime}}</p>
                    <p>专业:{{resumeData.head.major}}</p>
                    <p class="honor-title">荣获</p>
                    <p v-for="item in resumeData.head.honor.split('、')">{{item}}</p>
                </div>
                <div class="interest">
                    <h3><span class="item-title">兴趣爱好</span></h3>
                    <p><span class="inte-span" v-for="item in resumeData.head.interest.split('、')">{{item}}</span></p>
                </div>
                <div class="skill">
                    <h3><span class="item-title">技能特长</span></h3>
                    <div class="sk" v-for="(item,index) in resumeData.head.speciality.split('、')">{{item}}
                        <div class="sk-wrap">
                            <span class="sk-per" :style="{width:resumeData.head.specialityPer.split('、')[index]+'%'}"></span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section-right">
                <div class="blog-box clearfloat">
                    <div class="blog">
                        <div class="title-name">BLOG LINK</div>
                        <div class="link github"><i class="icon-github-alt icon-1x"></i>Github: <a target="_blank" href="https://github.com/ZengTianShengZ">{{resumeData.blogLink.github}}</a></div>
                        <div class="link personal-blog"><i class="icon-flag icon-1x"></i>技术博文 <a target="_blank" href="https://segmentfault.com/u/zss">{{resumeData.blogLink.blog}}</a></div>
                    </div>
                </div>
                <div class="experience work-experience">
                    <div class="title">
                        <div class="title-name">工作经验</div>
                        <div class="title-date">{{resumeData.workExperience.time}}</div>
                    </div>
                    <div class="show" v-for="item in resumeData.workExperience.experience">
                        <div class="item"  v-if="item.name" >
                            <div class="item-title">
                                <span class="item-name">{{item.name}}</span>
                                <span class="item-skill">/ {{item.skill}}</span>
                                <span class="item-date">{{item.time}}</span>
                            </div>
                            <ul>
                                <li v-for="des in item.describe">{{des}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="experience project-experience">
                    <div class="title">
                        <div class="title-name">项目经验</div>
                        <div class="title-date">{{resumeData.projectExperience.time}}</div>
                    </div>
                    <div class="show" v-for="item in resumeData.projectExperience.experience">
                        <div class="item" v-if="item.name">
                            <div class="item-title">
                                <span class="item-name">{{item.name}}</span>
                                <span class="item-skill">/ {{item.skill}}</span>
                                <span class="item-date">{{item.time}}</span>
                            </div>
                            <ul>
                                <li v-for="des in item.describe" v-if="des!=''">{{des}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="experience skill-experience">
                    <div class="title">
                        <div class="title-name">掌握技能</div>
                    </div>
                    <div class="show" v-for="item in resumeData.skill">
                        <div class="item"  v-if="item.type">
                            <div class="item-title">
                                <span class="item-name">{{item.type}}</span>
                            </div>
                            <ul>
                                <li v-for="des in item.describe">{{des}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="experience self-evaluation">
                    <div class="title">
                        <div class="title-name">自我评价</div>
                    </div>
                    <p class="eval-detail" v-for="item in resumeData.selfAssessment">{{item}}</p>
                </div>
            </section>
        </div>
        <div v-html="resStyleCode"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                msg:'hello vue',
                ttc:80,
                resStyleCode:"",
                pfdSize:{
                    width:"",
                    height:""
                }
            }
        },
        props:{
            resumeData:{
                type:Object
            }
        },
        methods:{
            responseStyleCode: function (code) {
                this.resStyleCode = "<style>"+code+"</style>"
            }
        },
        components:{

        }
    }
</script>

<style>
    #show-resume{
        float: left;
        width: 67%;
        height: 100%;
        background: #ffffff;
        padding: 1rem 2rem;
        overflow: auto;
        box-sizing: border-box;
    }
    .resume-content{
        width: 100%;
        height: 99%;
        box-shadow: 0 4px 12px 0 rgba(0,0,0,0.5);
        overflow: auto;
        background: rgb(249,249,249);
    }
    .resume-content::-webkit-scrollbar {
         display: none;
     }
</style>
