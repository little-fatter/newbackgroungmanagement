<template>
  <div id="nav">
    <el-container>
      <el-header class="heads">
        <div>后台管理系统</div>
        <div style="display: flex;align-items: center">
          <div @click="dialogVisible = true">
            <el-avatar
              shape="square"
              :size="40"
              :fit="fits"
              :src="this.user.avatar || 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
            ></el-avatar>
          </div>
          <div style="margin-left: 10px">
            <el-dropdown @command="handleCommand">
              <span>
                亲爱的:<span v-if="user">{{ user.username }}
                  <i class="el-icon-arrow-down el-icon--right"></i></span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">修改密码</el-dropdown-item>
                <el-dropdown-item command="b">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
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
      <el-dialog
              title="上传头像"
              :visible.sync="dialogVisible"
              width="40%"
              :before-close="handleClose">
          <el-upload
                  class="upload-demo"
                  drag
                  action="api/images"
                  :on-success="subsuccess"
                  :on-error="suberr"
          >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
      </el-dialog>
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
      user: "", //用户信息，判断是否登录
      time: "", //登录的时间
        dialogVisible:false,
      fits: "scale-down"
    };
  },
  methods: {
    handleCommand(command) {
      if (command === "b") {
        if (this.user) {
          this.$confirm("确认退出?", "退出登录", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            distinguishCancelAndClose: true
          }).then(() => {
            localStorage.removeItem("user");
            location.reload();
          });
        } else {
          this.$router.push("/Login");
        }
      }
      if (command === "a") {
        console.log(1);
      }
    },
      handleClose(done) {
          this.$confirm('确认关闭？')
              .then(_ => {
                  done();
              })
              .catch(_ => {});
      },
      subsuccess(response){
      this.user.avatar = response.url
        localStorage.setItem("user",JSON.stringify(this.user))
        this.dialogVisible = false
      },
      suberr(err){
          console.log(err);
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
  font-size: 16px;
  color: white;
}
</style>
