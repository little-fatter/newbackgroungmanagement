<template>
    <div style="display: flex;width: 100%">
        <div style="margin-top: 10px;width: 200px">
            <el-tree node-key="label" :default-expanded-keys="['区域中心']" render-after-expand highlight-current accordion :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div style="width: 900px;padding: 0 10px 10px 0">
            <div style="display: flex;width: 100%;flex-wrap: wrap;">
                <el-card style="width: 32%;margin: 10px 0 0 10px;font-size: 14px" class="box-card" v-for="item in showMailList" :key="item.id">
                    <div style="display: flex">
                        <div style="flex: 2">
                            <img style="border-radius: 50%" :src="item.images" alt="">
                        </div>
                        <div style="flex: 5;margin-left: 10px">
                            <div class="margintop">{{item.Names}}</div>
                            <div class="margintop">{{item.Componys}}/{{item.Positions}}</div>
                            <div class="margintop">
                                <div  v-if="!item.Label[0].text &&!item.Label[1].text&&!item.Label[2].text">
                                   快来给Ta添加一个标签吧!
                                </div>
                                <div  style="display: flex">
                                    <div v-for="(items,index) in item.Label"  :key="index">
                                        <div :style="{backgroundColor:items.color}" style="margin-left: 6px;padding: 4px;border-radius: 1em;font-size: 14px" v-if="items.text">
                                            {{items.text}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style="margin: 10px 0">
                    <div style="margin-left: 20px">
                        <div class="margintop">
                            邮箱：{{item.email}}
                        </div >
                        <div class="margintop">
                            办公电话：{{item.phone}}
                        </div>
                        <div class="margintop">
                            手机号码：{{item.tel}}
                        </div>
                        <div class="margintop">
                            性别：{{item.Sexs}}
                        </div>
                        <div class="margintop">
                            QQ：{{item.QQ}}
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MailList",
        data() {
            return {
                //获取的完整数据
MailList:[],
                //渲染的数据
                showMailList:[],
                data:[
                    {
                        label:'区域中心',
                    children:[
                        {
                            label: '哈尔滨公司',
                        }, {
                            label: '微易旅游',
                            children: [{
                                label: '微易',
                            }]
                        }, {
                            label: '测试部门',
                        },
                        {
                            label: '北方区域中心',
                            children: [{
                                label: '东南亚事业部',
                            }, {
                                label: 'B2B事业部',
                                children: [{
                                    label: '电商部',
                                    children:[{
                                        label:'产品组'
                                    },{
                                        label:'途牛组'
                                    },{
                                        label:'携程组'
                                    },{
                                        label:'其他电商组'
                                    },{
                                        label:'资料组'
                                    },{
                                        label:'运营支持组'
                                    }]
                                }]
                            },{
                                label: '华北销售区',
                                children: [{
                                    label: '京津组'
                                },{
                                    label: '济南公司'
                                },{
                                    label: '石家庄公司'
                                },{
                                    label: '河北组'
                                }]
                            },{
                                label: '中原销售区',
                                children: [{
                                    label: '太原公司'
                                },{
                                    label: '内蒙古组'
                                },{
                                    label: '郑州公司'
                                }]
                            },{
                                label: '单团部',
                            },{
                                label: '新销售业务部',
                            },{
                                label: '产品操作部',
                                children: [{
                                    label: '欧洲组'
                                },{
                                    label: '中东非组'
                                },{
                                    label: '票务组'
                                },{
                                    label: '单团组'
                                }]
                            },{
                                label: '签证部',
                                children: [{
                                    label: '外联部'
                                }]
                            }
                            ]
                        },{
                            label: '西南区域中心',
                            children: [{
                                label: '西南总经理办公室',
                            }, {
                                label: '成都公司',
                                children: [{
                                    label: '市场营销部'
                                },{
                                    label: '单团计调部'
                                },{
                                    label: '票务部'
                                },{
                                    label: '南亚计调部'
                                },{
                                    label: '欧洲散拼计调部'
                                },{
                                    label: '签证部'
                                },{
                                    label: '财务部'
                                },{
                                    label: '重庆办事处'
                                },{
                                    label: '电商部'
                                },{
                                    label: '综合管理部'
                                },{
                                    label: '销售部',
                                    children:[{
                                        label:'地州区'
                                    },{
                                        label:'成都区'
                                    },{
                                        label:'贵州区'
                                    }]
                                }]
                            }
                            ]
                        }
                    ]}
            ],

                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods:{
            getMail(){
                this.$axios.req("api/getMailList").then(res =>{
                    this.MailList = res.data.data
                    this.showMailList = res.data.data
                }).catch(err =>{
                    console.log(err);
                })
            },
            handleNodeClick(data) {
                console.log(data);
                if (data.label === '区域中心'){
                    this.showMailList = this.MailList
                } else {
                    this.showMailList = []
                    this.MailList.map(item =>{
                        item.Componys === data.label ? this.showMailList.push(item) : ''
                    })
                }
            }
        },
        mounted() {
            this.getMail()
        }
    }
</script>

<style scoped lang="scss">
.margintop{
    margin-top: 6px;
}
</style>
