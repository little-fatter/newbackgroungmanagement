<template>
    <div>
<!--        <full-calendar-->
<!--                :config="config"-->
<!--                :events="events"-->
<!--                ref="calendar"-->
<!--                @event-selected='eventClick'-->
<!--                @day-click="dayClick">-->
<!--        </full-calendar>-->
        <div id="calendar"></div>
        <el-dialog
                title="日程"
                :visible.sync="dialogVisible"
                width="80%"
                >
            <div>
                <el-input v-model="dotext" placeholder="准备做什么..."></el-input>
            </div>
            <div>
                时间：<el-time-select
                    placeholder="起始时间"
                    v-model="startTime"
                    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
            </el-time-select>
                <el-time-select
                        placeholder="结束时间"
                        v-model="endTime"
                        :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }">
                </el-time-select>
            </div>
            <div>
                <div>参与人</div>
                <div v-for="(item,index) in Participants" :key="index+'abc'">
                    {{item}}
                </div>
                <div>
                    <el-popover
                            placement="bottom"
                            width="200"
                            trigger="click"
                    >
                        <div>
                            <input type="text" v-model="Participant" placeholder="请输入参与人姓名">
                        </div>
                        <div>
                            <el-button @click="addParticipant" type="primary">确认</el-button>
                        </div>
                        <el-button slot="reference">+</el-button>
                    </el-popover>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import dayjs from 'dayjs'
    import $ from 'jquery'
    import { FullCalendar } from 'vue-full-calendar' //单页
    import 'fullcalendar/dist/fullcalendar.css'
    export default {
        name: "ScheduleManagement",
        components:{
            FullCalendar
        },
        data() {
            return {
                config:{
                   firstDay:'0',//以周日为每周的第一天
                   locale:'zh-cn',//语言
                    defaultView:'month',//默认按月显示
                    height:'auto',
                    fixedWeekCount:false,//是否固定显示六周
                    allDaySlot:false,
                    header:{//表头信息
                       left:'prev,next,today',
                        center:'title',
                        right:'custom'
                    }
                },
                events:[],//日程事件
                // eventRender: function(event,element) {
                //     console.log(event);
                //     console.log(element);
                // },
                clickdaily:'',//点击日历的事件
                dialogVisible:false,
                dotext:'',//input框内容
                startTime: '',
                endTime: '',
                Participants:[],//所有参与人
                Participant:""//新增单个参与人
            }
        },
        methods:{
            //事件点击事件
            eventClick(event){
                console.log(event);
            },
            //日期点击事件
            dayClick(date,jsEvent,view){
                this.clickdaily = dayjs(date._d).format('YYYY-MM-DD')
                this.dialogVisible = true
                console.log(dayjs(date._d).format('YYYY-MM-DD'));
                console.log(jsEvent);
                console.log(view);
            },
            // changeDate(){
            //     this.$refs.calendar.fireMethod('gotoDate',this.selectDate)
            // },
            //获取日程
            getdaily(){
                this.$axios.req("api/daily/getDaily").then(res =>{
                    if (res.data.code === 200){
                        this.events = res.data.data
                    }
                }).catch(err =>{
                    console.log(err);
                })
            },
            //添加参与人
            addParticipant(){
                this.Participants.push(this.Participant)
                console.log(this.Participants);
                this.Participant = ''
            },
        },
        mounted() {
            this.getdaily()
            $('#calendar').fullCalendar({
                dayClick:  () => {
                    alert('a day has been clicked!');
                },
                header:{
                    left:   'today prev,next',
                    center: 'title',
                    right:  ''
                },
                events: [
                    {
                        title: 'My Event',
                        start: '2019-09-08',
                        description: 'This is a cool event'
                    },
                    {
                        title: 'My Event2',
                        start: '2019-09-07',
                        description: 'This is a cool event2'
                    }
                    // more events here
                ],
                eventAfterRender:  (event,element ) => {
                    console.log(element.event);
                    // console.log(event);
                    let custom_event =
                        '<p ><b>Districts</b>: ' + '</p>'+
                    '<p>这是一段话</p>'
                    element.append(custom_event);
                }
            })
        }
    }
</script>

<style scoped>

</style>
