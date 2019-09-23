<template>
  <div class="hello">
    <div @click="isCollapse = !isCollapse" style="margin: 20px">按我一下</div>
      <el-menu  router class="el-menu-vertical-demo"  :collapse="isCollapse">
        <el-menu-item index="1" route="/" v-if="news[0]">
          <i class="el-icon-s-home"></i>
          <template slot="title" >
          <span>首页</span>
          <span class="news" v-show="news[0].length > 0" @click="clicknews(0)">new</span>
          </template>
          <i v-show="news[0].length > 0 && isCollapse" class="mininews">*</i>
        </el-menu-item>
        <el-menu-item index="2" route="/ScheduleManagement" v-if="news[1]">
          <i class="el-icon-location"></i>
          <template slot="title" >
          <span >日程管理</span>
          <span class="news" v-show="news[1].length > 0" @click="clicknews(1)">new</span>
          </template>
          <i v-show="news[1].length > 0 && isCollapse"  class="mininews">*</i>
        </el-menu-item>
        <el-menu-item index="3" route="/MailList" v-if="news[2]">
          <i class="el-icon-mobile-phone"></i>
          <template slot="title" >
          <span >通讯录</span>
          <span class="news" v-show="news[2].length > 0" @click="clicknews(2)">new</span>
          </template>
          <i v-show="news[2].length > 0 && isCollapse"  class="mininews">*</i>
        </el-menu-item>
        <el-submenu index="4" v-if="news[3] || news[4] || news[5]">
          <template slot="title" >
            <i class="el-icon-s-custom"></i>
            <span slot="title">组织员工</span>
            <span class="news" v-show="news[3].length > 0 || news[4].length > 0 || news[5].length > 0 ">new</span>
            <i v-show="isCollapse && (news[3].length > 0 || news[4].length > 0 || news[5].length > 0)  "  class="mininews">*</i>
          </template>
          <el-menu-item-group index="4-1">
            <el-menu-item index="4-1-1" route="/Offer" v-if="news[3]">
              <i class="el-icon-document"></i>
              <span>Offer管理</span>
              <span class="news" v-show="news[3].length > 0" @click="clicknews(3)">new</span>
<!--              <i v-show="news[3].length > 0 && isCollapse"  class="mininews">*</i>-->
            </el-menu-item>
            <el-menu-item index="4-1-2" route="/OrganizeEmployees" v-if="news[4]">
              <i class="el-icon-female"></i>
              <span>人员信息</span>
              <span class="news" v-show="news[4].length > 0" @click="clicknews(4)">new</span>
<!--              <i v-show="news[4].length > 0 && isCollapse"  class="mininews">*</i>-->
            </el-menu-item>
            <el-menu-item index="4-1-3" route="/Salary" v-if="news[5]">
              <i class="el-icon-coin"></i>
            <span>薪酬管理</span>
              <span class="news" v-show="news[5].length > 0" @click="clicknews(5)">new</span>
<!--              <i v-show="news[5].length > 0 && isCollapse"  class="mininews">*</i>-->
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title" v-if="news[6]">
            <i class="el-icon-menu"></i>
            <span slot="title">表单页</span>
            <span class="news" v-show="news[6].length > 0" >new</span>
            <i v-show="news[6].length > 0 && isCollapse"  class="mininews">*</i>
          </template>
          <el-menu-item-group index="5-1">
            <el-menu-item index="5-1-1" route="/Form" v-if="news[6]">
              <i class="el-icon-copy-document"></i>
              <span>分步表单</span>
              <span class="news" v-show="news[6].length > 0" @click="clicknews(6)">new</span>
<!--              <i v-show="news[6].length > 0 && isCollapse"  class="mininews">*</i>-->
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    <div>
      <el-dialog
              title="new"
              :visible.sync="dialogVisible"
              width="30%"
            >
        <div v-for="(item,index) in newsarr" :key="index+'abc'">
{{index+1}}:{{item.sentence}}
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="delnewsarr">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
  },
  data() {
    return {
      isCollapse: false,
      news:[],
      dialogVisible:false,
      newsarr:[],
      tempindex:'',
    };
  },
  methods: {
  getnews(){
    this.$axios.req("api/getnews").then(res =>{
      let arr =  res.data.data.map(item =>{
       let arrs =  item.new.filter(items =>{
          return items.boolean === true
        })
       return arrs
      })
      this.news = arr
    }).catch(err =>{
      console.log(err);
    })
  },
    clicknews(index){
    this.tempindex = index
this.dialogVisible = true
this.newsarr = this.news[index]
      window.event? window.event.cancelBubble = true : e.stopPropagation();//阻止冒泡事件
    },
    delnewsarr(){
    this.dialogVisible = false
      this.newsarr = []
      this.news[this.tempindex] = []
    }
    },
  mounted() {
    this.getnews()
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 800px;
  }
  template {
    position: relative;
  }
  .news {
    color: red;
    position: absolute;
    right: 40px;
  }
  .mininews {
    right: -4px;
    color: red;
    position: relative;
    font-size: 20px;
    top: 4px;
  }
</style>
