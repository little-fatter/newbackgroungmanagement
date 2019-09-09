<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>利润（万）</div>
      </div>
      <div >
        <ve-wordcloud :data="chartData" width="500px" height="250px" :settings="chartSettings"></ve-wordcloud>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ProfiCityt",
  data() {

      this.chartSettings = {
          shape: 'circle',
          sizeMin: 10,
          sizeMax: 20
      }
    return {
      chartData: {
        columns: ["word", "count"],
        rows: []
      }
    };
  },
  methods: {
    getdata() {
      this.$axios
        .req("api/getProfi")
        .then(res => {
            this.chartData.rows = res.data.data
         return res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>

<style scoped>
.box-card{
  height: 320px;
}
</style>
