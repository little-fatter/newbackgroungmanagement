import Mock from "mockjs";
let arr = ["已发布", "未发布", "已截止"];
let arr1 = [{name:'百度',Web:'https://www.baidu.com/'},{name:'豆瓣',Web:'https://www.douban.com/'},{name:'掘金',Web:'https://juejin.im/'},{name:'Github',Web:'https://github.com/'}]
let arr2 = ["男","女"]
let arr3 = ['成都分公司', '北京分公司', '上海分公司', '哈尔滨公司', '微易', '郑州公司','测试部门', '财务部', '地州区', '盒马项目组', '成都区', '贵州区', '电商部', '综合管理部', '全民营销项目组','单团部', '新销售业务部', '欧洲组', '中东非组', '票务组', '外联部', '西南总经理办公室', '市场营销部', '单团计调部', '票务部', '南亚计调部', '欧洲散拼计调部', '签证部', '东南亚事业部', '产品组', '途牛组', '携程组', '其他电商组', '资料组', '运营支持组', '京津组', '河北组', '太原公司','内蒙古组'
]
let arr4 = ['经理','主管','员工','实习生']
Mock.mock("api/getnews","get",{
  code:200,
  msg:"success",
  "data|7":[{
    id: "@increment(1)+news",
new:[{sentence:"@csentence()",boolean:"@boolean()"},
  {sentence:"@csentence()",boolean:"@boolean()"},
  {sentence:"@csentence()",boolean:"@boolean()"}]
    }]
})
Mock.mock("api/getList", "get", {
  code: 200,
  msg: "success",
  "data|5": [
    {
      id: "@increment(1)",
      name: "@cword(2,4)",
      count: "@natural(2,10)",
      price: "@natural(10,1000)",
      img: "@dataImage(80x80)",
      phone: /\d{3}-\d{8}|\d{4}-\d{7}/,
      tel: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
      email: /^\d{7,11}@(qq|163)\.com/,
    }
  ]
});
Mock.mock("api/getRevenue", "get", {
  code: 200,
  msg: "success",
  "data|3": [
    {
      id: `@increment(1)` + "Rvn",
      count: "@natural(1,100)",
      price: "@natural(5000,100000)",
    }
  ]
});

Mock.mock("api/getProfi", "get", {
  code: 200,
  msg: "success",
  "data|30": [
    {
      id: `@increment(1)` + "Profi",
      word: "@city()",
      count: "@natural(5000,100000)",
    }
  ]
});

Mock.mock("api/getPeople", "get", {
  code: 200,
  msg: "success",
  "data|20": [
    {
      value: `@increment(1)` + "Pep",
      name: "@cname()",
    }
  ]
});

Mock.mock("api/getQuestionnaire", "get", {
  code: 200,
  msg: "success",
  "data|30": [
    {
      id: `@increment(1)` + "Pep",
      QuestionName: "@cword( 2, 4 )",
      QuestionDescribe: "@cword( 2, 5 )",
      CreateTime: "@date()",
      StopTime: "@date()",
      QuertionState: () => {
        let num = parseInt(Math.random() * arr.length);
        return arr[num];
      },
      WebName: () => {
        let num = parseInt(Math.random() * arr1.length);
        return arr1[num];
      },
    }
  ]
});

Mock.mock("api/getMailList", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      id: `@increment(1)` + "MaiL",
      Names: "@cname()",
      images:'@dataImage(80x80,@Names)',
      tel:/^(?:(?:\+|)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/ ,
      phone: /\d{3}-\d{8}|\d{4}-\d{7}/,
      email: /^\d{7,11}@(qq|163)\.com/,
      Sexs: () => {
        let num = parseInt(Math.random() * arr2.length);
        return arr2[num];
      },
      QQ:/^[1-9][0-9]{4,10}$/,
      Componys: () => {
        let num = parseInt(Math.random() * arr3.length);
        return arr3[num];
      },
      Positions:()=>{
        let num = parseInt(Math.random() * arr4.length);
        return arr4[num];
      },
      Label:[{text:'@cword(0,3)',color:'@color()'},{text:'@cword(0,3)',color:'@color()'},{text:'@cword(0,3)',color:'@color()'}],
      // Colors:['@color()','@color()','@color()','@color()','@color()','@color()']
    }
  ]
});

Mock.mock("api/getOffer", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      id: `@increment(1)` + "Ofr",
      Names: "@cname()",
      tel:/^(?:(?:\+|)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/ ,
      phone: /\d{3}-\d{8}|\d{4}-\d{7}/,
      email: /^\d{7,11}@(qq|163)\.com/,
      Sexs: () => {
        let num = parseInt(Math.random() * arr2.length);
        return arr2[num];
      },
      QQ:/^[1-9][0-9]{4,10}$/,
      Componys: () => {
        let num = parseInt(Math.random() * arr3.length);
        return arr3[num];
      },
      Positions:()=>{
        let num = parseInt(Math.random() * arr4.length);
        return arr4[num];
      },
      // Label:[{text:'@cword(0,3)',color:'@color()'},{text:'@cword(0,3)',color:'@color()'},{text:'@cword(0,3)',color:'@color()'}], // Colors:['@color()','@color()','@color()','@color()','@color()','@color()']
      NativePlace: "@city(true)",
      MaritalStatus: () =>{
         let arrs =['未婚','已婚']
        let num = parseInt(Math.random() * arrs.length)
        return arrs[num];
      },
      DocumentType: "@cword(2,4)",
      IdentificationNumber: /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/,
      birthDate:/^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/,
      ApprovalStatus:() =>{
        let arrs = [ '待发', '已发', '已接受', '已拒绝' ,'已入职']
        let num = parseInt(Math.random() * arrs.length)
        return arrs[num];
      },
      age: "@natural(18,60)",
      Education: () =>{
        let arrs = [ '初中', '高中', '大专', '本科', '硕士', '博士', '博士以上']
        let num = parseInt(Math.random() * arrs.length)
        return arrs[num];
      },
      EntryTime: /^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/,
      Nation: "@cword(2,4)",
      WorkingPlace: "@city()"
    },
  ]
});

Mock.mock("api/getEployees", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      id: `@increment(1)` + "Epl",
      Names: "@cname()",
      JobNumber: "@natural(1000,9999)",
      mechanism:"区域中心",
      Componys: () => {
        let num = parseInt(Math.random() * arr3.length);
        return arr3[num];
      },
      timeBegin:/^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/,
      timeEnd:/^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/,
      Positions:()=>{
        let num = parseInt(Math.random() * arr4.length);
        return arr4[num];
      },
      ApprovalStatus: () =>{
        let arrs = ['审批通过','审批未通过','审批中']
        let num = parseInt(Math.random() * arrs.length);
        return arrs[num];
      }
    }
  ]
});

Mock.mock( 'api/getSalary','get',{
  code: 200,
  msg: "success",
  "data|3":[
  {
    id: `@increment(1)` + "Slr",
    SalaryStructure:'@cword(2,5)',
    PlannedExpenditure:"@natural(10000,1000000)",
    ActualExpenditure:"@natural(10000,1000000)",
    lastPlannedExpenditure:"@natural(10000,1000000)",
    lastActualExpenditure:"@natural(10000,1000000)"
  }
]
})

// Mock.mock("api/login", "post", (options) => {
//   console.log(options);
//   return {
//     code: 200,
//     msg: "success"
//   };
// })
