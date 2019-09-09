<template>
  <div id="nav">
    <div class="heads">
      <div>后台管理系统</div>
      <div>亲爱的</div>
    </div>
    <div style="display: flex;background-color: #f0f0f0;">
        <div>
            <Navmean></Navmean>
        </div>
        <div style="position: relative;top: 0;bottom: 0;left: 0;right: 0;padding: 30px">
            <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>
  import Navmean from "../../components/HelloWorld"
export default {
  name: "Content",
  components :{
    Navmean
  }
};
</script>

<style scoped lang="scss">
.heads{
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color:skyblue;
}
</style>
