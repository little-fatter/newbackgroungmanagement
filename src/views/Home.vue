<template>
  <div class="home">
    <div>
      <div class="head">
        <div class="revnenuebox"
             :class="choooseitem === index ?
             index === 0 ? 'chooseitem1': index === 1 ? 'chooseitem2': 'chooseitem3' : ''"
             v-for="(item,index) in revenue" @click="clkitem(item,index)" :key="item.id">
          <div>
            <div style="color: #afafaf">{{item.items}}</div>
            <div style="margin-top: 10px;font-size: 20px">￥{{item.price}}</div>
          </div>
          <div style="margin-left: 50px">
            <Circles :chooseitem="choooseitem" :index="index" :progress="item.count" :id="item.id"></Circles>
          </div>
          <div v-if="index !== revenue.length-1" style="position: absolute;right: 10px">
            |
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex;margin-top: 40px">
      <div style="flex: 1;height: 320px">
        <ProfiCityt></ProfiCityt>
      </div>
      <div style="margin-left: 40px;flex: 1;height: 320px">
        <Dynamic></Dynamic>
      </div>
    </div>
    <div style="margin-top: 40px">
      <Questionnaire></Questionnaire>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Circles from "../components/Circles";
import ProfiCityt from "../components/ProfiCityt";
import Dynamic from "../components/Dynamic";
  import Questionnaire from "../components/Questionnaire";
export default {
  name: "home",
  components: {
    Circles,
    ProfiCityt,
    Questionnaire,
    Dynamic
  },
  data() {
    return {
      revenue: [] , //营收
      choooseitem : 0
    };
  },
  methods: {
    getRevenue() {
      this.$axios
        .req("api/getRevenue")
        .then(res => {
          this.revenue = res.data.data;
          this.revenue[0].items = '本月营收（元）'
          this.revenue[1].items = '待回款（元）'
          this.revenue[2].items = '客单价/合同（元）'
        })
        .catch(err => {
          console.log(err);
        });
    },
    clkitem(item,index) {
      this.choooseitem = index
    }
  },
  mounted() {
    this.getRevenue()
  }
};
</script>

<style lang="scss" scoped>
  .head{
    display: flex;
    justify-content: center;
    margin-top: 20px
  }
  .revnenuebox{
    position:relative;
    display: flex;
    align-items: center;
    width: 360px;
    padding: 10px 30px;
    box-sizing: border-box;
    background-color: white;
  }
  .chooseitem1 {
    border-top: 6px solid #5eb0fe
  }
  .chooseitem2 {
    border-top: 6px solid #80e313
  }
  .chooseitem3 {
    border-top: 6px solid #f2ae57;
  }
</style>
