<template>
  <div>
    <div>薪酬管理</div>
    <div style="margin-top: 20px;display: flex;justify-content: space-between;align-items: center;padding: 20px;background-color: white">
      <div style="font-size: 20px;font-weight: bold">
        <span >{{ value2 }}</span
        ><span style="margin-left: 20px">薪酬预算</span>
      </div>
      <div>
        <el-date-picker
          v-model="value2"
          type="month"
          format="yyyy年MM月"
          value-format="yyyy年MM月"
          placeholder="选择月"
        >
        </el-date-picker>
      </div>
    </div>
    <div style="margin: 20px 20px 0">
      <div>如果有更多的渠道请自行添加，所有添加的渠道会显示在CRM系统中</div>
    </div>
    <div style="background-color: white;padding: 20px;margin-top: 20px">
      <div style="margin: 0 20px 20px;font-weight: bold;font-size: 20px">薪资结构</div>
      <div>
        <div class="rowbox">
          <div class="rowboxson">薪资构成</div>
          <div class="rowboxson">计划支出（元）</div>
          <div class="rowboxson">实际支出（元）</div>
          <div class="rowboxson">上月计划（元）</div>
          <div class="rowboxson">上月实际（元）</div>
        </div>
        <div class="rowbox" v-for="item in Salary" :key="item.id">
          <div class="rowboxson">
              <div>
                  <input type="text" :class="item.SalaryStructure?'backcolor':''" v-model="item.SalaryStructure" />
              </div>
          </div>
          <div class="rowboxson">
              <div>
                  <input type="number" @blur="centain" @keyup.enter="keyup($event)" :class="item.PlannedExpenditure?'backcolor':''"  v-model="item.PlannedExpenditure" />
              </div>
          </div>
          <div class="rowboxson">
              <div>
                  <input type="number" ref="secondinput" @blur="centain" @keyup.enter="$event.target.blur()" :class="item.ActualExpenditure?'backcolor':''"  v-model="item.ActualExpenditure" />
              </div>
          </div>
          <div class="rowboxson">
              <div>
                  <input type="number" disabled class="backcolor" v-model="item.lastPlannedExpenditure" />
              </div>
          </div>
          <div class="rowboxson">
              <div>
                  <input type="number" disabled class="backcolor" v-model="item.lastActualExpenditure" />
              </div>
          </div>
        </div>
        <div class="rowbox colors">
          <div ref="aaa" class="rowboxson">总计</div>
          <div class="rowboxson">{{ planedtotal }}</div>
          <div class="rowboxson">{{ Actualtotal }}</div>
          <div class="rowboxson">{{ lastplanedtotal }}</div>
          <div class="rowboxson">{{ lastActualtotal }}</div>
        </div>
      </div>
      <div>
        <el-button style="margin: 20px" v-show="show"  type="primary" @click="additem">添加更多</el-button>
          <el-button style="margin: 20px" v-show="!show" type="primary" @click="centain(1)">确定</el-button>
          <el-button style="margin: 20px" v-show="!show" type="info" @click="canceladd">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Salary",
  data() {
    return {
      value2: dayjs(Date.now()).format("YYYY年MM月"),
      Salary: [],
      planedtotal: 0,
      lastplanedtotal: 0,
      Actualtotal: 0,
      lastActualtotal: 0,
        show:true
    };
  },
  methods: {
    getSalary() {
      this.$axios
        .req("api/getSalary")
        .then(res => {
          this.Salary = res.data.data;
          this.Salary.map(item => {
            this.planedtotal += item.PlannedExpenditure;
            this.lastplanedtotal += item.lastPlannedExpenditure;
            this.Actualtotal += item.ActualExpenditure;
            this.lastActualtotal += item.lastActualExpenditure;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    additem() {
        this.show = false
      this.Salary.push({
        id: this.Salary.length + "Slr",
        SalaryStructure: "",
        PlannedExpenditure: "",
        ActualExpenditure: "",
        lastPlannedExpenditure: 0,
        lastActualExpenditure: 0
      });
    },
      centain(i){
        if(i===1){this.show = true}
          this.planedtotal = 0
          this.lastplanedtotal = 0
          this.Actualtotal = 0
          this.lastActualtotal = 0
          this.Salary.map(item => {
              this.planedtotal +=  Number(item.PlannedExpenditure) ;
              this.lastplanedtotal += Number(item.lastPlannedExpenditure);
              this.Actualtotal += Number(item.ActualExpenditure);
              this.lastActualtotal += Number(item.lastActualExpenditure);
          });
      },
      canceladd(){
          this.Salary.pop()
          this.show = true
      },
      keyup(events){
          events.target.blur()
          let length = this.$refs.secondinput.length - 1
          this.$refs.secondinput[length].focus()
      }
  },
  mounted() {
    this.getSalary();
  }
};
</script>

<style scoped lang="scss">
.rowbox {
  display: flex;
  padding: 20px 10px;
  border: 1px solid #afafaf;
}
.rowboxson {
  flex: 1;
  margin-left: 10px;
  text-align: center;
}
input {
  padding: 4px 2px;
  text-align: center;
  font-size: 16px;
    width: 140px;
}
.backcolor{
    border: none;
    background-color: white;
}
.colors {
  color: deepskyblue;
}
</style>
