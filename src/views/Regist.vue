<template>
  <div class="resdv">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>注册</span>
      </div>
      <div class="text item">
        <div>
          <div class="publics" v-if="!index2" style="color: red">*请输入用户名</div>
          <div class="publics" v-else>*请输入用户名</div
          >
          <div class="publics">
            <el-input
                    v-model="usernames"
                    placeholder="请输入用户名"
                    clearable
                    maxlength="20"
                    show-word-limit
            ></el-input>
          </div>
        </div>
        <div>
          <div class="publics" v-if="!index" style="color: red">*请输入密码(6-20位)</div>
          <div class="publics" v-else>*请输入密码(6-20位)</div>
          <div class="publics">
            <el-input
                    placeholder="请输入密码"
                    v-model="passwords"
                    minlength="6"
                    show-password
                    clearable
            ></el-input>
          </div>
        </div>
        <div>
          <div class="publics" v-if="!reindex" style="color: red">*请确认密码(6-20位)</div>
          <div class="publics" v-else>*请确认密码(6-20位)</div>
          <div class="publics">
            <el-input
                    placeholder="请确认密码"
                    v-model="repasswords"
                    minlength="6"
                    show-password
                    clearable
            ></el-input>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: space-around">
        <el-button type="success" @click="Userlogin">返回登录</el-button>
        <el-button type="success" @click="Userregsiter">立即注册</el-button>
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>{{ msg }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pagechanges">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      dialogVisible: false,
      usernames: "",
      passwords: "",
      repasswords: "",
      codes: "",
      msg: "",
      index: false,
      reindex: false,
      index2: false
    };
  },
  methods: {
    Userlogin() {
      this.$router.push("/login");
    },
    pagechanges() {
      this.dialogVisible = false;
      if (this.codes === 200) {
        this.$router.push("/login");
      } else {
        this.usernames = "";
        this.passwords = "";
        this.repasswords = "";
      }
    },
    //用户注册
    Userregsiter() {
      if (
        this.index === false ||
        this.reindex === false ||
        this.index2 === false
      ) {
        this.usernames = "";
        this.passwords = "";
        this.repasswords = "";
        alert("输入错误");
      } else if (this.passwords === this.repasswords) {
        this.$axios
          .req("api/users/register", {
            username: this.usernames,
            password: this.passwords,
          })
          .then(item => {
            this.codes = item.data.code;
            this.msg = item.data.msg;
            console.log(this.codes);
            this.dialogVisible = true;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.dialogVisible = true;
        this.msg = "两次输入的密码不同"
        this.usernames = "";
        this.passwords = "";
        this.repasswords = "";
      }
    }
  },
  watch: {
    usernames: {
      handler: function(usernames) {
        usernames.length > 0 ? (this.index2 = true) : (this.index2 = false);
      },
      deep: true
    },
    repasswords: {
      handler: function(repasswords) {
        repasswords.length >= 6
          ? (this.reindex = true)
          : (this.reindex = false);
      },
      deep: true
    },
    passwords: {
      handler: function(passwords) {
        passwords.length >= 6 ? (this.index = true) : (this.index = false);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
  .publics{
    margin-top: 10px;
  }
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.resdv {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /*background: url("../assets/img/1907087.gif");*/
}
.el-card {
  position: relative;
  left: 400px;
  top: 100px;
}
</style>
