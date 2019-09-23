<template>
    <div>
        <div>人员信息</div>
        <div style="display: flex;justify-content: space-between;margin-top: 20px">
            <div style="display: flex">
                <div @click="allemployees"><el-button size="mini" round :type="index===1?'primary':''">全部员工</el-button></div>
                <div @click="employing" style="margin-left: 10px"><el-button size="mini" round :type="index===2?'primary':''">考核中员工</el-button></div>
                <div @click="employeed" style="margin-left: 10px"><el-button size="mini" round :type="index===3?'primary':''">已转正员工</el-button></div>
            </div>
            <div style="display: flex">
                <div v-if="index!==2"><el-button size="mini" type="primary">确认</el-button></div>
                <div v-if="index!==2" style="margin-left: 10px"><el-button size="mini" type="primary">取消</el-button></div>
                <div v-if="index===2" style="margin-left: 10px"><el-button size="mini" @click="Apply" type="primary">批量转正申请</el-button></div>
                <div style="margin-left: 10px"><el-button size="mini" type="primary">导出</el-button></div>
            </div>
        </div>
        <div style="margin-top: 20px">
            <el-card class="box-card">
                <div  class="text item">
                    <el-table
                            ref="multipleTable"
                            :data="showEmployees"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="Names"
                                label="姓名"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="JobNumber"
                                label="工号"
                                sortable
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="mechanism"
                                label="机构"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="Componys"
                                label="部门"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="timeBegin"
                                label="试用开始时间"
                                sortable
                                width="140">
                        </el-table-column>
                        <el-table-column
                                prop="timeEnd"
                                label="试用结束时间"
                                sortable
                                width="140">
                        </el-table-column>
                        <el-table-column
                                label="转正审批状态"
                                width="120">
                            <template slot-scope="scope">
                                <div style="color: deepskyblue">{{scope.row.ApprovalStatus}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="120">
                            <template >
                                <el-button type="primary" size="mini">编辑试用期</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30]"
                    :page-size="currentNum"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="allEmployees.length">
            </el-pagination>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                >
            <span>{{msg}}</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="cancelapply">取 消</el-button>
            <el-button type="primary" @click="addapply">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "OrganizeEmployees",
        data() {
            return {
                Employees: [],//组织员工
                showEmployees:[],//当前页显示的员工数据
                allEmployees:[],//当前选中状态的全部员工数据
                multipleSelection: [],//勾选中的数据
                currentPage: 1,//当前页
                currentNum: 10,//每页显示数量
                index:1,//选中状态。1为全部，2为考核中，3为已转正
                dialogVisible:false,
                msg:''
            }
        },
        methods:{
            //获取员工数据
            getEmployees(){
                this.$axios.req("api/getEployees").then(res =>{
                    this.Employees = res.data.data
                    this.allEmployees = res.data.data
                    this.showEmployees = this.Employees.slice(0,10)
                }).catch(err =>{
                    console.log(err);
                })
            },
            //获取勾选员工数据
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //当前显示条数更改
            handleSizeChange(val) {
                this.currentNum = val
                this.showEmployees = this.allEmployees.slice((this.currentPage-1)*this.currentNum,(this.currentPage)*this.currentNum)
            },
            //当前页更改
            handleCurrentChange(val) {
                this.currentPage  = val
                this.showEmployees = this.allEmployees.slice((this.currentPage-1)*this.currentNum,(this.currentPage)*this.currentNum)
            },
            //全部员工按钮点击事件
            allemployees(){
                this.index = 1
                this.currentPage = 1
                this.allEmployees = this.Employees
                this.showEmployees = this.allEmployees.slice((this.currentPage-1)*this.currentNum,(this.currentPage)*this.currentNum)
            },
            //考核中员工按钮点击事件
            employing(){
                this.index = 2
                this.currentPage = 1
                this.allEmployees = this.Employees.filter(item =>{
                return item.ApprovalStatus === "审批中"
            })
                this.showEmployees = this.allEmployees.slice((this.currentPage-1)*this.currentNum,(this.currentPage)*this.currentNum)
            },
            //转正员工按钮点击事件
            employeed(){
                this.index = 3
                this.currentPage = 1
                this.allEmployees = this.Employees.filter(item =>{
                    return item.ApprovalStatus === "审批通过"})
                this.showEmployees = this.allEmployees.slice((this.currentPage-1)*this.currentNum,(this.currentPage)*this.currentNum)
            },
            //转正申请
            Apply(){
                this.dialogVisible = true
                if (this.multipleSelection.length >0){
                    this.msg = '是否确认转正？'
                } else {
                    this.msg = '未选择选项'
                }
            },
            //取消申请
            cancelapply(){
                this.dialogVisible = false
                this.msg = ''
            },
            //确认转正申请
            addapply(){
                this.dialogVisible = false
                if (this.multipleSelection.length > 0){
                   this.multipleSelection.map(item =>{
                        item.ApprovalStatus = '审批通过'
                    })
                    this.allEmployees = this.Employees.filter(item =>{
                        return item.ApprovalStatus === "审批中"
                    })
                    this.showEmployees = this.allEmployees.slice(
                        (this.currentPage-1)*this.currentNum,(this.currentPage)*this.currentNum)
                }
            }
        },mounted() {
            this.getEmployees()
        }
    }
</script>

<style scoped lang="scss">
.block {
    margin-top: 20px;
}
</style>
