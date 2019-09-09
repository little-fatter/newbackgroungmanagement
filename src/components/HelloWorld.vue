<template>
  <div class="hello">
    <div @click="isCollapse = !isCollapse" style="margin: 20px">按我一下</div>
      <el-menu default-active="1" router class="el-menu-vertical-demo" @select="selectmenu"  :collapse="isCollapse">
        <el-menu-item index="1" route="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2" route="/ScheduleManagement">
          <i class="el-icon-location"></i>
          <span slot="title">日程管理</span>
        </el-menu-item>
        <el-menu-item index="3" route="/MailList">
          <i class="el-icon-mobile-phone"></i>
          <span slot="title">通讯录</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">组织员工</span>
          </template>
          <el-menu-item-group index="4-1">
            <el-menu-item index="4-1-1" route="/Offer">
              <i class="el-icon-document"></i>
              <span>Offer管理</span>
            </el-menu-item>
            <el-menu-item index="4-1-2" route="/OrganizeEmployees">
              <i class="el-icon-female"></i>
              <span>人员信息</span>
            </el-menu-item>
            <el-menu-item index="4-1-3" route="/Salary">
              <i class="el-icon-coin"></i>
            <span>薪酬管理</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">表单页</span>
          </template>
          <el-menu-item-group index="5-1">
            <el-menu-item index="5-1-1" route="/Form">
              <i class="el-icon-copy-document"></i>
              <span>分步表单</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    selectmenu(key){
      console.log(key);
    }
  },
  mounted() {
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 800px;
  }
</style>
