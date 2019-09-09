import Mock from "mockjs";
let arr = ["已发布", "未发布", "已截止"];
let arr1 = [{name:'百度',Web:'https://www.baidu.com/'},{name:'豆瓣',Web:'https://www.douban.com/'},{name:'掘金',Web:'https://juejin.im/'},{name:'Github',Web:'https://github.com/'}]
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

// Mock.mock("api/login", "post", (options) => {
//   console.log(options);
//   return {
//     code: 200,
//     msg: "success"
//   };
// })
