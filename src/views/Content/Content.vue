<template>
  <div id="nav">
    <el-container>
      <el-header class="heads">
              <div>后台管理系统</div>
              <div @click="tologin">
                亲爱的:<span v-if="user">{{ user.username }}</span>
              </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <Navmean></Navmean>
        </el-aside>
        <el-main style="background-color: #f0f0f0;">
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Navmean from "../../components/HelloWorld";
export default {
  name: "Content",
  components: {
    Navmean
  },
  data() {
    return {
      user: "",//用户信息，判断是否登录
      time: ""//登录的时间
    };
  },
  methods: {
    tologin() {
      if (this.user) {
        this.$confirm("确认退出?", "退出登录", {
          confirmButtonText: "确定",
          cancelButtonText: '取消',
          distinguishCancelAndClose: true,
        }).then(() =>{
          localStorage.removeItem("user")
          location.reload()
        })
      } else {
        this.$router.push("/Login");
      }
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.time = localStorage.getItem("logintime");
  }
};
</script>

<style scoped lang="scss">
.heads {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: skyblue;
  width: 100%;
  box-sizing: border-box;
}
</style>
