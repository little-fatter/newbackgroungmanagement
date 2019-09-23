<template>
  <div style="margin: 20px">
    <div style="width: 100%;background-color: white;padding: 10px 20px;box-sizing: border-box;">
      <p style="font-size: 20px;font-weight: bolder">请填写您的转账信息</p>
      <p style="color: #afafaf;font-size: 14px">
        请务必是你本人操作，确认转账金额及收款人信息
      </p>
    </div>
    <div style="background-color: white;width: 100%;margin-top: 20px;padding: 20px;box-sizing: border-box; ">
<div>
    <el-steps :active="active" finish-status="success">
    <el-step title="填写转账信息">
    </el-step>
    <el-step title="确认转账信息">
    </el-step>
    <el-step title="完成">
    </el-step>
</el-steps>
</div>
        <div class="activebox" v-show="active === 0">
            <div class="margintop">
                <span class="colorred">*</span><span>付款账号：</span>
                &nbsp;<el-input clearable  style="width: 80%;margin-left: 20px" v-model="PaymentAccount" placeholder="付款账号"></el-input>
            </div>
            <div class="margintop">
                <span class="colorred">*</span><span>收款账户：</span>
                &nbsp;
                <el-input clearable  style="width: 80%;margin-left: 20px" v-model="CollectionAcount"  placeholder="收款账户">
                    <el-select v-model="select" slot="prepend" style="width: 100%" placeholder="请选择">
                        <el-option label="银行卡" value="1"></el-option>
                        <el-option label="支付宝" value="2"></el-option>
                        <el-option label="微信" value="3"></el-option>
                    </el-select>
                </el-input>
            </div>
            <div class="margintop">
                <span class="colorred">*</span><span>付款人姓名：</span>
                <el-input clearable style="width: 80%;margin-left: 20px" v-model="PaymentName" placeholder="付款人姓名"></el-input>
            </div>
            <div class="margintop">
                <span class="colorred">*</span><span>收款金额：</span>
                &nbsp;<el-input clearable  style="width: 80%;margin-left: 20px" v-model="CollectionMoney" placeholder="收款金额"></el-input>
            </div>
            <div class="margintop">
                <el-button style="margin-top: 12px;" :disabled="!PaymentAccount||!CollectionAcount||!PaymentName||!CollectionMoney" @click="active++">下一步</el-button>
            </div>
        </div>
        <div class="activebox" v-show="active === 1">
            <div>
                <el-alert
                        title="确认转账后，资金将直接打入对方账户，无法退回。"
                        type="warning"
                        show-icon>
                </el-alert>
            </div>
            <div id="printJS-form">
                <div class="margintop"  >
                    <span class="colorred">*</span><span>付款账号：</span><span>{{PaymentAccount}}</span>
                </div>
                <div class="margintop">
                    <span class="colorred">*</span><span>收款账户：</span><span>{{CollectionAcount}}</span>
                </div>
                <div class="margintop">
                    <span class="colorred">*</span><span>付款人姓名：</span><span>{{PaymentName}}</span>
                </div>
                <div class="margintop">
                    <span class="colorred">*</span><span>收款金额：</span><span>{{CollectionMoney}}</span>
                </div>
            </div>
            <hr class="margintop">
            <div class="margintop">
                <div class="margintop">
                    <span class="colorred">*</span><span>支付密码：</span>
                    <el-input style="width: 80%" v-model="PayPassword" placeholder="支付密码"></el-input>
                </div>
            </div>
            <div class="margintop">
                <el-button style="margin-top: 12px;" @click="active--">上一步</el-button>
                <el-button type="primary" style="margin-top: 12px;" @click="active ++">提交</el-button>
            </div>
        </div>
        <div class="activebox" v-if="active === 2">
            <div>
                <div></div>
                <div class="margintop" >操作成功</div>
                <div class="margintop">预计两小时到账</div>
            </div>
            <div class="margintop">
                <div>
                    <svg
                            style="background-color: #afafaf"
                            xmlns="http://www.w3.org/2000/svg"
                            height="200px"
                    >
                        <text
                                x="20"
                                y="40"
                                fill="white"
                                text-anchor="start">付款账号：{{PaymentAccount}}</text>
                        <text
                                x="20"
                                y="80"
                                fill="white"
                                text-anchor="start">收款账户：{{PaymentAccount}}</text>
                        <text
                                x="20"
                                y="120"
                                fill="white"
                                text-anchor="start">付款人姓名：{{PaymentName}}</text>
                        <text
                                x="20"
                                y="160"
                                fill="white"
                                text-anchor="start">收款金额：{{CollectionMoney}}</text>
                    </svg>
                </div>
            </div>
           <div class="margintop">
               <el-button type="primary" style="margin-top: 12px;" @click="again">再转一笔</el-button>
               <el-button style="margin-top: 12px;" @click="Prints" >打印</el-button>
           </div>
        </div>
    </div>
  </div>
</template>

<script>
    import printJS from 'print-js'
export default {
  name: "Form",
  components: {
  },
  data() {
    return {
      active: 0,
        CollectionMoney:'',//收款金额
        PaymentName:'',//付款人姓名
        CollectionAcount:'',//收款账户
        PaymentAccount:'',//付款账户
        select:'',//银行选择
        PayPassword:'',//支付密码
    };
  },
  methods: {
      //再转一笔
      again(){
        this.active = 0
              this.CollectionMoney = ''
          this.PaymentName = ''
              this.CollectionAcount = ''
              this.PaymentAccount = ''
              this.select = ''
              this.PayPassword = ''
      },
      Prints(){
          printJS('printJS-form', 'html')
          this.active = 0
          this.CollectionMoney = ''
          this.PaymentName = ''
          this.CollectionAcount = ''
          this.PaymentAccount = ''
          this.select = ''
          this.PayPassword = ''
      }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
    .margintop {
        margin-top: 20px;
        text-align: center;
    }
    .activebox{
        margin: auto auto;
    }
    .colorred {
        color: red;
        margin-right: 2px;
    }
</style>
