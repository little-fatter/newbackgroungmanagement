<template>
  <div>
    <lunar-full-calendar
      ref="calendars"
      @event-render="eventRender"
      @event-selected="eventSelected"
      @day-click="daySelected"
      :events="events"
      :config="config"
    ></lunar-full-calendar>
    <el-dialog title="日程" :visible.sync="dialogVisible" width="80%">
      <div>
        <el-input v-model="dotext" placeholder="准备做什么..."></el-input>
      </div>
      <div style="margin-top: 10px" v-if="today">
        时间：<el-time-select
              style="margin-left: 10px"
              placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
            start: timenow,
            step: '00:15',
            end: '24:00'
          }"
        >
        </el-time-select>
        <el-time-select
                style="margin-left: 10px"
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
            start: timenow,
            step: '00:15',
            end: '24:00',
            minTime: startTime
          }"
        >
        </el-time-select>
      </div>
      <div style="margin-top: 10px" v-else>
        时间：<el-time-select
              style="margin-left: 10px"
              placeholder="起始时间"
              v-model="startTime"
              :picker-options="{
            start: '07:00',
            step: '00:15',
            end: '24:00'
          }"
      >
      </el-time-select>
        <el-time-select
                style="margin-left: 10px"
                placeholder="结束时间"
                v-model="endTime"
                :picker-options="{
            start: '07:00',
            step: '00:15',
            end: '24:00',
            minTime: startTime
          }"
        >
        </el-time-select>
      </div>
      <div style="margin-top: 10px;display: flex;align-items: end">
        <div>参与人</div>
        <div style="margin-left: 20px">
          {{ Participants }}
        </div>
        <div style="margin-left: 20px">
          <el-popover style="position: absolute" placement="bottom" width="200" trigger="click">
            <div>
              <input
                type="text"
                v-model="Participant"
                placeholder="请输入参与人姓名"
                style="padding: 6px 2px;width: 100%"
              />
            </div>
            <div style="position: relative;left: 150px;top: 10px;">
              <el-button @click="addParticipant" type="primary" size="mini">确认</el-button>
            </div>
            <el-button slot="reference"  size="mini">+</el-button>
          </el-popover>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelcalendar">取 消</el-button>
        <el-button type="primary" @click="addcalendar" v-if="Participants&&dotext" >确 定</el-button>
        <el-button type="primary" @click="addcalendar" v-else disabled >确 定</el-button>
      </span>
    </el-dialog>
      <el-dialog
              title="提示"
              :visible.sync="dialogVisible1"
              width="30%"
              >
          <span>{{msg}}</span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="delDaily">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
              title="提示"
              :visible.sync="dialogVisible2"
              width="30%"
              >
          <span>{{msg1}}</span>
          <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { LunarFullCalendar } from "vue-lunar-full-calendar";
export default {
  name: "ScheduleManagement",
  components: {
    // FullCalendar,
    LunarFullCalendar
  },
  data() {
    return {
      config: {
        lunarCalendar: true, //控制是否显示中国农历、显示的为true，隐藏为flase，默认为true
        firstDay: "0", //以周日为每周的第一天
        locale: "zh-cn", //语言
        defaultView: "month", //默认按月显示
        height: "auto"
      },
      events: [], //日程事件
      clickdaily: "", //点击日历的时间
      dialogVisible: false,
      dotext: "", //input框内容
      startTime: "",
      endTime: "",
      Participants: "", //所有参与人
      Participant: "", //新增单个参与人
      num: 0 ,//所有参与人数
        dialogVisible1:false,
        dialogVisible2:false,
        msg:"",
        msg1:"",
        id:'',//点击日程的事件id
      timenow:'',
      today:false
    };
  },
  methods: {
    //获取日程
    getdaily() {
      this.$axios
        .req("api/daily/getDaily")
        .then(res => {
          if (res.data.code === 200) {
            this.events = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //事件点击事件
    eventSelected(event) {
        this.dialogVisible1 = true
        this.msg = '是否删除日程？'
        this.id = event._id
    },
    //日期点击事件
    daySelected(event) {
        let day = Date.now()-86400000
      let time1 = dayjs(event._d).format("YYYY-MM-DD")
      let time2 = dayjs(Date.now()).format("YYYY-MM-DD")
      if (event._d < day){
            this.dialogVisible2 = true
            this.msg1 = '今日之前的日程不能编辑'
           }
            else {
        if (time1 === time2){
          this.today = true}
        else {this.today = false}
        this.dialogVisible = true;
            this.clickdaily = time1;
        }

    },
    //添加参与人
    addParticipant() {
      this.Participants = this.Participant + "|" + this.Participants;
      this.num++;
      this.Participant = "";
    },
    //添加日程
    addcalendar() {
      this.dialogVisible = false;
      this.$axios
        .req("api/daily", {
          start: this.clickdaily,
          title: `${this.startTime} - ${this.endTime}  ${this.dotext}`,
          description: `<div>参与人：${this.Participants}</div>
<div>参与人数：${this.num}</div>`
        })
        .then(res => {
          this.clickdaily = "";
          this.startTime = "";
          this.endTime = "";
          this.dotext = "";
          this.Participants = "";
          this.num = 0;
          if (res.data.code === 200) {
            this.getdaily();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    eventRender(event, element) {
      let custom_event = event.description;
      element.append(custom_event);
    },
      cancelcalendar(){
          this.dialogVisible = false
          this.clickdaily = "";
          this.startTime = "";
          this.endTime = "";
          this.dotext = "";
          this.Participants = "";
          this.num = 0;
      },
    //删除日程
      delDaily(){
        this.dialogVisible1 = false
        if (this.events.length === 1){
          this.events = []
        }
          this.$axios.req("api/daily/delDaily",{_id:this.id}).then(res =>{
            if (res.data.code === 200){
                this.dialogVisible2 = true
                this.msg1 = res.data.msg
                this.getdaily()
            }
        }).catch(err =>{
              this.dialogVisible1 = true
              this.msg1 = err.data.msg
        })
      }
  },
  mounted() {
    this.getdaily();
    let times = Date.now()
    let HH = dayjs(times).format("HH")
    let MM = dayjs(times).format("mm")
    if (MM <= 15){
      this.timenow = HH+":15"
    } else if (MM > 15 && MM <= 30){
      this.timenow = HH+":30"
    } else if (MM > 30 && MM <= 45){
      this.timenow = HH+":45"
    } else {
      this.timenow = (Number(HH)+1)+":00"
    }
  }
};
</script>

<style scoped></style>
