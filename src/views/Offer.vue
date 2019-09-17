<template>
    <div>
        <div style="display: flex;justify-content: space-between;margin: 20px">
            <div>offer管理</div>
            <div style="display: flex">
                <div>新建offer</div>
                <div style="margin-left: 20px">转移状态</div>
                <div style="margin-left: 20px">导出</div>
            </div>
        </div>
        <div style="margin-top: 20px">
            <el-card class="box-card">
                <div @click="dialogVisible = true"> 设置</div>
                <div  class="text item">
                    <el-table
                            ref="multipleTable"
                            :data="showOffer"
                            show-overflow-tooltip="true"
                            tooltip-effect="dark"
                            :style="spaces"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                                type="selection"

                        >
                        </el-table-column>
                        <el-table-column
                                v-if="index.A"
                                prop="Names"
                                label="姓名"
                               >
                        </el-table-column>
                        <el-table-column
                                v-if="index.B"
                                prop="email"
                                label="个人邮箱"
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.C"
                                prop="DocumentType"
                                label="证件类型"
                               >
                        </el-table-column>
                        <el-table-column
                                v-if="index.D"
                                prop="IdentificationNumber"
                                label="证件号码"
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.E"
                                prop="Sexs"
                                label="性别"
                                sortable
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.F"
                                prop="Positions"
                                label="职位"
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.G"
                                prop="NativePlace"
                                label="籍贯"
                               >
                        </el-table-column>
                        <el-table-column
                                v-if="index.H"
                                prop="QQ"
                                label="QQ"
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.I"
                                prop="EntryTime"
                                label="入职时间"
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.J"
                                prop="ApprovalStatus"
                                label="offer状态"
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.K"
                                prop="birthDate"
                                label="出生日期"
                                sortable
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.L"
                                prop="Nation"
                                label="民族"
                               >
                        </el-table-column>
                        <el-table-column
                                v-if="index.M"
                                prop="phone"
                                label="电话"
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.N"
                                prop="Education"
                                label="学历"
                                sortable
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.O"
                                prop="tel"
                                label="手机"
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.P"
                                prop="WorkingPlace"
                                label="工作地点"
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.Q"
                                prop="Componys"
                                label="部门"
                                >
                        </el-table-column>
                        <el-table-column
                                v-if="index.R"
                                prop="MaritalStatus"
                                label="婚姻状况"
                              >
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </div>
        <div>
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%"
                    >
                <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;">
                    <el-checkbox v-model="index.A">姓名</el-checkbox>
                    <el-checkbox v-model="index.B">个人邮箱</el-checkbox>
                    <el-checkbox v-model="index.C">证件类型</el-checkbox>
                    <el-checkbox v-model="index.D">证件号码</el-checkbox>
                    <el-checkbox v-model="index.E">性别</el-checkbox>
                    <el-checkbox v-model="index.F">职位</el-checkbox>
                    <el-checkbox v-model="index.G">籍贯</el-checkbox>
                    <el-checkbox v-model="index.H">QQ</el-checkbox>
                    <el-checkbox v-model="index.I">入职时间</el-checkbox>
                    <el-checkbox v-model="index.J">offer状态</el-checkbox>
                    <el-checkbox v-model="index.K">出生日期</el-checkbox>
                    <el-checkbox v-model="index.L">民族</el-checkbox>
                    <el-checkbox v-model="index.M">电话</el-checkbox>
                    <el-checkbox v-model="index.N">学历</el-checkbox>
                    <el-checkbox v-model="index.O">手机</el-checkbox>
                    <el-checkbox v-model="index.P">工作地点</el-checkbox>
                    <el-checkbox v-model="index.Q">部门</el-checkbox>
                    <el-checkbox v-model="index.R">婚姻状况</el-checkbox>
                </div>
                <div style="margin: 15px 0">
                    <div>选择间距类型</div>
                    <div style="display: flex;justify-content: space-around">
                        <div :class="Nums===0? 'color':''" @click="changewidth(-1,0)">紧凑</div>
                        <div :class="Nums===1? 'color':''" @click="changewidth(0,1)">适中</div>
                        <div :class="Nums===2? 'color':''" @click="changewidth(1,2)">宽松</div>
                    </div>
                </div>
                <span slot="footer" >
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30]"
                    :page-size="currentNum"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="Offer.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Offer",
        data() {
            return {
                Offer: [],
                showOffer:[],
                multipleSelection: [],//勾选中的数据
                currentPage: 1,//当前页
                currentNum: 10,//每页显示数量
                index:{
                    A:true,
                    B:true,
                    C:true,
                    D:true,
                    E:true,
                    F:true,
                    G:true,
                    H:true,
                    I:true,
                    J:false,
                    K:false,
                    L:false,
                    M:false,
                    N:false,
                    O:false,
                    P:false,
                    Q:false,
                    R:false
                },
                dialogVisible:false,
                checkAll:false,
                Nums: 1,
                spaces:"letter-spacing: 0px"
            }
        },
        methods:{
            getOffer(){
                this.$axios.req("api/getOffer").then(res =>{
                    this.Offer = res.data.data
                    this.showOffer = res.data.data.slice(0,10)
                }).catch(err =>{
                    console.log(err);
                })
            },
            //当前显示条数更改
            handleSizeChange(val) {
                this.currentNum = val
                this.showOffer = this.Offer.slice((this.currentPage-1)*this.currentNum,(this.currentPage)*this.currentNum)
            },
            //当前页更改
            handleCurrentChange(val) {
                this.currentPage  = val
                this.showOffer = this.Offer.slice((this.currentPage-1)*this.currentNum,(this.currentPage)*this.currentNum)
            },
            //获取勾选员工数据
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCheckAllChange(val) {
                val ? this.index = {
                    A:true,
                    B:true,
                    C:true,
                    D:true,
                    E:true,
                    F:true,
                    G:true,
                    H:true,
                    I:true,
                    J:true,
                    K:true,
                    L:true,
                    M:true,
                    N:true,
                    O:true,
                    P:true,
                    Q:true,
                    R:true
                } : this.index = {
                    A:false,
                    B:false,
                    C:false,
                    D:false,
                    E:false,
                    F:false,
                    G:false,
                    H:false,
                    I:false,
                    J:false,
                    K:false,
                    L:false,
                    M:false,
                    N:false,
                    O:false,
                    P:false,
                    Q:false,
                    R:false
                }
            },
            changewidth(num,nums){
                this.spaces = `letter-spacing: ${num}px`
                this.Nums = nums
            }
        },
        mounted() {
            this.getOffer()
            let I  = JSON.parse(localStorage.getItem("index"))
            if (I){
                this.index = I
            }
        },
        watch:{
            index:{
                handler(newindex){
                    localStorage.setItem("index",JSON.stringify(newindex))
                },
                deep: true,
                immediate:false
            }
        }
    }
</script>

<style scoped lang="scss">
    .block {
        margin-top: 20px;
    }
    .color{
        color: #5eb0fe;
    }
</style>
