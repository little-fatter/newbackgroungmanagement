<template>
  <div id="nav">
    <div class="heads">
      <div>后台管理系统</div>
      <div @click="tologin">
          亲爱的:<span v-if="user">{{user.username}}</span>
      </div>
    </div>
      <div style="background-color: #f0f0f0;min-width: 1350px;">
          <div style="display: flex;">
              <div>
                  <Navmean></Navmean>
              </div>
              <div style="background-color: #f0f0f0;padding: 30px">
                  <router-view></router-view>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  import Navmean from "../../components/HelloWorld"
export default {
  name: "Content",
  components :{
    Navmean,
  },
    data() {
        return {
            user: '',
            time:''
        }
    },
    methods:{
        tologin(){
            if (this.user){
                this.$alert('确认退出?', '退出登录', {
                    confirmButtonText: '确定',
                    callback: () => {
                        localStorage.removeItem("user")
                        location.reload()
                    }
                });
            }
            else {
                this.$router.push("/Login")
            }
        }
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.time = localStorage.getItem("logintime")
    }
};
</script>

<style scoped lang="scss">
.heads{
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color:skyblue;
    /*min-width: 1300px;*/
    width: 100%;
    box-sizing: border-box;
}
</style>
