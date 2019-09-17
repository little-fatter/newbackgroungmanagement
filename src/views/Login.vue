<template>
  <div class="lgdv">
    <el-card v-if="fingpswd" class="box-card">
      <div slot="header" class="clearfix">
        <span>找回密码</span>
        <el-button @click="outfingpswd" style="float: right; padding: 3px 0" type="text">返回登录</el-button>
      </div>
      <div>
        <div class="publics" v-if="index2" style="color: red">*请输入用户名</div>
        <div class="publics" v-else>*请输入用户名</div
        >
        <div class="publics">
          <el-input
                  v-model="usernames"
                  placeholder="请输入用户名"
                  clearable
          ></el-input>
        </div>
      </div>
      <div>
        <div class="publics" v-if="!email" style="color: red">*请输入邮箱</div>
        <div class="publics" v-else>*请输入邮箱</div
        >
        <div class="publics">
          <el-input
                  v-model="email"
                  placeholder="请输入邮箱"
                  clearable
          ></el-input>
        </div>
      </div>
      <div style="display: flex;justify-content: center;margin: 10px 20px ">
        <el-button type="primary" v-if="usernames && email" @click="findpassword">找回密码</el-button>
        <el-button type="primary" disabled v-else>找回密码</el-button>
      </div>
    </el-card>
    <el-card v-else class="box-card">
      <div slot="header" class="clearfix">
        <div style="display: flex;justify-content: space-around">
          <div  @click="clklogin" :class="!phonelogin ? 'chooselogin' : ''">账号登录</div>
          <div  @click="clkphonelogin" :class="phonelogin ? 'chooselogin' : ''">手机登录</div>
        </div>
      </div>
      <div v-if="!phonelogin" class="text item">
        <div>
          <div class="publics" v-if="index2" style="color: red">*请输入用户名</div>
          <div class="publics" v-else>*请输入用户名</div
          >
          <div class="publics">
            <el-input
                    v-model="usernames"
                    placeholder="请输入用户名"
                    clearable
            ></el-input>
          </div>
        </div>
        <div>
          <div class="publics" v-if="index" style="color: red">*请输入密码(6-20位)</div>
          <div class="publics" v-else>*请输入密码(6-20位)</div>
          <div class="publics" style="display: flex">
            <el-input
                    placeholder="请输入密码"
                    v-model="passwords"
                    show-password
                    clearable
            ></el-input>
            <el-button type="success" @click="tofindpswd">
              找回密码
            </el-button>
          </div>
        </div>
        <div>
          <div class="publics" v-if="index1" style="color: red">*请输入验证码</div>
          <div class="publics" v-else>*请输入验证码</div
          >
          <div class="publics" style="display: flex;align-items: center">
            <el-input
                    placeholder="请输入验证码"
                    v-model="vcodes"
                    clearable
            ></el-input>
            <div v-html="svg" @click="vcodechange"></div>
          </div>
        </div>
      </div>
      <div v-else class="text item">
        <div>
          <div class="publics" v-if="index2" style="color: red">*请输入手机号</div>
          <div class="publics" v-else>*请输入手机号</div>
          <div class="publics" style="display: flex">
            <el-input v-model="phone" placeholder="请输入手机号" clearable>
            </el-input>
            <el-button type="success" v-if="index2" disabled>发送验证码</el-button>
            <el-button type="success" v-else @click="sendmsg">发送验证码</el-button>
          </div>
        </div>
        <div>
          <div class="publics" v-if="index1" style="color: red">*请输入验证码</div>
          <div class="publics" v-else>*请输入验证码</div>
          <div class="publics">
            <el-input
                    placeholder="请输入验证码"
                    v-model="VerificationCode"
                    clearable
            ></el-input>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: space-around">
        <el-button type="primary" @click="Userlogin">立即登录</el-button>
        <el-button type="primary" @click="Userregister">立即注册</el-button>
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
  import dayjs from "dayjs"
export default {
  name: "register",
  data() {
    return {
      // dialogVisible1: false,
      phonelogin: false,
      dialogVisible: false,
      usernames: "",
      passwords: "",
      codes: "",
      msg: "",
      svg: "",
      vcodes: "",
      index: true,
      index1: true,
      index2: true,
      VerificationCode: "",
      phone: "",
      fingpswd: false,
      email: "",
    };
  },
  methods: {
    findpassword(){
      this.$axios.req("api/users/findpswd",{
        username: this.usernames,
        emails: this.email
      }).then(res =>{
        console.log(res);
      }).catch(err =>{
        console.log(err);
      })
    },
    outfingpswd(){
      this.fingpswd = false
      this.usernames = ""
      this.email = ""
    },
    tofindpswd(){
      this.fingpswd = true
      this.usernames = "";
      this.passwords = "";
      this.vcodes = "";
    },
    clkphonelogin() {
      this.phonelogin = true;
      this.usernames = "";
      this.passwords = "";
      this.vcodes = "";
    },
    clklogin() {
      this.phonelogin = false;
      this.phone = "";
      this.VerificationCode = "";
    },
    //用户注册
    Userregister() {
      this.$router.push("/Regist");
    },
    //更换标签
    vcodechange() {
      this.getcode();
    },
    //关闭弹窗
    pagechanges() {
      this.dialogVisible = false;
      if (this.codes === 200) {
        // this.$store.state.user = this.usernames;
        this.$router.push("/");
      } else {
        this.usernames = "";
        this.passwords = "";
        this.vcodes = "";
      }
    },
    //用户登录
    Userlogin() {
      if (this.phonelogin) {
        if (!this.index1 && !this.index2){
          this.$axios
                  .req("api/users/phonelogin", {
                    phone: this.phone,
                    code: this.VerificationCode
                  })
                  .then(res => {
                    this.codes = res.data.code
                    this.msg = res.data.msg
                    if (res.data.code === 200) {
                      let d = new Date();
                      let times = dayjs(d).format("HH");
                      let user = res.data.data;
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("logintime", times);
                    }

                  })
                  .catch(err => {
                    console.log(err);
                  });
        }
        else {
          this.phone = "";
          this.VerificationCode = "";
          this.msg = "输入错误"
        }
      }
      else {
        this.getcode();
        if (
          this.index === false &&
          this.index1 === false &&
          this.index2 === false
        ) {
          this.$axios
            .req("api/users/login", {
              username: this.usernames,
              password: this.passwords,
              code: this.vcodes
            })
            .then(item => {
              this.codes = item.data.code
              this.msg = item.data.msg
              if (item.data.code === 200) {
                let d = new Date();
                let times = dayjs(d).format("HH");
                let user = item.data.data;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("logintime", times);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.usernames = "";
          this.passwords = "";
          this.vcodes = "";
          this.msg = "输入错误"
        }
      }
      let times  = setTimeout(() =>{
        this.dialogVisible = true
        clearTimeout(times)
      },500)

    },
    //获取图片验证码
    getcode() {
      this.$axios
        .req("api/captcha")
        .then(item => {
          this.svg = item.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendmsg() {
      if (!this.index2) {
        this.$axios
          .req("api/users/sendmsg", {
            phone: this.phone
          })
          .then(res => {
            console.log(2);
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.getcode();
  },
  watch: {
    phone: {
      handler: function(phone) {
        phone.length === 11 ? (this.index2 = false) : (this.index2 = true);
      },
      deep: true
    },
    VerificationCode: {
      handler: function(VerificationCode) {
        VerificationCode.length === 6
          ? (this.index1 = false)
          : (this.index1 = true);
      },
      deep: true
    },
    usernames: {
      handler: function(usernames) {
        usernames.length > 0 ? (this.index2 = false) : (this.index2 = true);
      },
      deep: true
    },
    passwords: {
      handler: function(passwords) {
        passwords.length >= 6 ? (this.index = false) : (this.index = true);
      },
      deep: true
    },
    vcodes: {
      handler: function(vcodes) {
        vcodes.length === 4 ? (this.index1 = false) : (this.index1 = true);
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
  .chooselogin {
    background-color: #76C84E;
    padding: 4px 20px;
    color: white;
    border-radius: 5px;
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
  opacity: 0.9;
}
.lgdv {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: auto;
}
.el-card {
  position: relative;
  left: 400px;
  top: 60px;
}
</style>
