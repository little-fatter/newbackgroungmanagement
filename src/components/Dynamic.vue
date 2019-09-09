<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人动态</span>
        <el-button
          style="float: right; padding: 4px "
          type="primary"
          @click="dialogVisible = true"
          >添加动态</el-button
        >
      </div>
      <div style="position: relative;
	overflow: hidden;height: 230px;">
        <div class="card-body">
          <div>
            <div class="block">
              <el-date-picker
                v-model="value"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                @change="changetime"
              >
              </el-date-picker>
            </div>
          </div>
          <div style="margin-top: 20px">
            <div v-if="showdynamic.length > 0">
              <div
                      :class="index % 2 === 0 ? 'onedynamic1' : 'onedynamic2'"
                      v-for="(item, index) in showdynamic"
                      :key="item.id"
              >
                <div style="display: flex;justify-content: space-between">
                  <div>{{ item.dynamic }}</div>
                  <div>
                  <span v-for="(items, indexs) in item.reporter" :key="indexs">
                    {{ items }}
                  </span>
                  </div>
                </div>
                <div
                        style="display: flex;justify-content: space-between;margin-top: 10px"
                >
                  <div>动态：{{ item.text }}</div>
                  <div style="font-size: 14px;color: white">
                    {{ item.createDate }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              暂无动态
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
      <div style="display: flex;align-items: center">
        <div>动态类型</div>
        <div style="margin-left: 20px">
          <el-select v-model="selectvalue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div
        v-show="selectvalue"
        style="display: flex;align-items: center;margin-top: 30px"
      >
        <div>汇报人</div>
        <div style="margin-left: 34px">
          <el-select multiple v-model="selectPeople" placeholder="请选择">
            <el-option
              v-for="item in Reporter"
              :key="item.value"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div style="display: flex;align-items: center;margin-top: 30px">
        <div>文本信息</div>
        <div style="margin-left: 20px">
          <el-input style="width: 900px" v-model="texts" type="text" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancels">取 消</el-button>
        <el-button type="primary" @click="AddDynamics">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
            title="提示"
            :visible.sync="ismsg"
            width="30%"
            >
      <span>{{msg}}</span>
      <span slot="footer" class="dialog-footer">
<!--        <el-button @click="ismsg = false">取 消</el-button>-->
        <el-button type="primary" @click="addok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Dynamic",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }, //日期选择器
      value: Date.now(), //当前日期
      dialogVisible: false, //弹出框
      options: [
        {
          value: "选项1",
          label: "个人心情"
        },
        {
          value: "选项2",
          label: "工作汇报"
        },
        {
          value: "选项3",
          label: "公司相关"
        },
        {
          value: "选项4",
          label: "其他"
        }
      ], //动态类型
      selectvalue: "", //选中的动态类型
      Reporter: [], //汇报人数组
      selectPeople: [], //选中的汇报人
      texts: "",//动态内容
      dynamic: [], //动态
      showdynamic:[],//显示的动态
      msg:'',//数据请求返回信息
      ismsg:false,
      code:''//数据请求返回码
    };
  },
  methods: {
    //改变时间
    changetime(){
      this.showdynamic = []
      this.dynamic.map(item =>{
                if (item.createDate === dayjs(this.value).format(`YYYY年MM月DD日`)
                ) {
                  this.showdynamic.push(item)
                }})
    },
    //获取汇报人
    getdata() {
      this.$axios
        .req("api/getPeople")
        .then(res => {
          this.Reporter = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消上传动态
    cancels() {
      this.dialogVisible = false;
      this.selectPeople = [];
      this.selectvalue = "";
      this.texts = "";
    },
    //上传动态
    AddDynamics() {
      let date = dayjs(this.value).format(`YYYY年MM月DD日`);
      if (this.texts) {
        this.$axios
          .req("api/category", {
            reporter: this.selectPeople,
            dynamic: this.selectvalue,
            createDate: date,
            text: this.texts
          })
          .then(res => {
            this.code = res.data.code
            this.dialogVisible = false;
            this.msg = res.data.msg
            this.ismsg = true
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("err");
      }
    },
    //获取动态
    getdynamic() {
      this.$axios
        .req("api/category/getCate")
        .then(res => {
          this.dynamic = res.data.data;
          this.dynamic.map(item =>{
           if (item.createDate === dayjs(this.value).format(`YYYY年MM月DD日`)
           ) {
             this.showdynamic.push(item)
           }
          })
        })
        .catch(err => {
          console.log(err);
        });
    },
    addok(){
      this.ismsg = false
      if (this.code === 200){ this.getdynamic()}
    }
  },
  mounted() {
    this.getdata();
    this.getdynamic();
  }
};
</script>

<style scoped>
.box-card {
  height: 320px;
}
.el-select {
  width: 900px;
}
.onedynamic1 {
  padding: 10px;
  background-color: #afafaf;
  margin-top: 10px;
}
.onedynamic2 {
  padding: 10px;
  margin-top: 10px;
  background-color: #f0f0f0;
}
.card-body {
  left: 0;
  top: 0;
  bottom: 0;
  width: 450px;
  position: absolute;
  overflow-y: scroll;
}
</style>
