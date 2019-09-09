<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>网站问卷调查</span>
      </div>
      <div class="text item">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="QuestionName" label="问卷名称" width="180">
          </el-table-column>
          <el-table-column prop="QuestionDescribe" label="问卷描述" width="180">
          </el-table-column>
          <el-table-column prop="CreateTime" label="创建时间" sortable>
          </el-table-column>
          <el-table-column prop="StopTime" label="截止时间" sortable>
          </el-table-column>
          <el-table-column prop="QuertionState" label="问卷主题">
            <template slot-scope="scope">
              <el-button size="mini" type="primary">{{
                scope.row.QuertionState
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="WebName.name" label="网站名称">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.WebName.name === '百度'"
                size="mini"
                type="primary"
                >{{ scope.row.WebName.name }}</el-button
              >
              <el-button
                v-if="scope.row.WebName.name === '豆瓣'"
                size="mini"
                type="success"
                >{{ scope.row.WebName.name }}</el-button
              >
              <el-button
                v-if="scope.row.WebName.name === '掘金'"
                size="mini"
                type="info"
                >{{ scope.row.WebName.name }}</el-button
              >
              <el-button
                v-if="scope.row.WebName.name === 'Github'"
                size="mini"
                type="warning"
                >{{ scope.row.WebName.name }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="Webdetails(scope.row)"
                >查看网站详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog title="网站详情" :visible.sync="dialogVisible" width="60%">
      <div class="dialogdiv">
        <div style="margin-top: 20px">
          <input
            style="width: 80%;padding: 8px;border-radius: 6px"
            id="test"
            type="text"
            :value="websites"
          />
          <el-button
            style="margin-left: 20px"
            type="primary"
            size="medium"
            @click="copyweb"
            >复制</el-button
          >
        </div>
        <div class="tips">
          如无法使用上方复制按钮，请选中内容后，使用Ctrl+C复制。也可扫描下方二维码或右键保存二维码进行访问。
        </div>
        <div class="canvasbox">
          <canvas id="canvas"></canvas>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "Questionnaire",
  components: {},
  data() {
    return {
      tableData: [],
      dialogVisible: false, //控制弹框显示隐藏
      websites: "" //网址
    };
  },
  methods: {
    //实现复制功能
    copyweb() {
      let content = document.getElementById("test");
      content.select();
      document.execCommand("Copy");
    },
    //获取网站详情
    getQuertion() {
      this.$axios
        .req("api/getQuestionnaire")
        .then(res => {
          this.tableData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //展开网站详情，生成二维码
    Webdetails(item) {
      this.dialogVisible = true;
      this.websites = item.WebName.Web;
      let canvas = document.getElementById("canvas");
      this.$nextTick(() => {
        if (canvas){
          QRCode.toCanvas(canvas, item.WebName.Web, function(error) {
          if (error) console.error(error);
        });}else {
          this.Webdetails(item)
        }

      });
    }
  },
  mounted() {
    this.getQuertion();
  }
};
</script>

<style lang="scss" scoped>
.dialogdiv {
  width: 100%;
  /*background-color: #76C84E;*/
  /*margin: auto auto;*/
  padding: 20px;
  box-sizing: border-box;
}
.tips {
  margin-top: 20px;
  border-radius: 10px;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: skyblue;
}
#canvas {
  height: 200px !important;
  width: 200px !important;
}
.canvasbox {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>
