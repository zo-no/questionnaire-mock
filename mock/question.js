const Mock = require("mockjs");
const getQuestionList = require("./data/getQuestionList");
// const getComponentList = require('./data/getComponentList')

const Random = Mock.Random;

module.exports = [
  {
    // 获取单个问卷信息
    url: "/api/question/:id",
    method: "get",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
          desc: "问卷描述",
          js: "",
          css: "",
          isDeleted: false,
          isPublished: true,
          // componentList: getComponentList()
        },

        // errno: 1002,
        // msg: '错误测试'
      };
    },
  },
  {
    // 创建问卷
    url: "/api/question",
    method: "post",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      };
    },
  },
  {
    // 获取（查询）问卷列表
    url: "/api/question",
    method: "get",
    response(ctx) {
      const { url = "", query = {} } = ctx; //url可以获取到请求路径，query可以获取到请求参数
      const isDeleted = url.indexOf("isDeleted=true") >= 0; //url.indexOf()方法用于判断字符串中是否包含指定的子字符串，如果包含则返回子字符串的起始位置，否则返回-1
      const isStar = url.indexOf("isStar=true") >= 0; //判断是否返回已收藏的问卷
      const pageSize = parseInt(query.pageSize) || 10; //parseInt() 函数可解析一个字符串，并返回一个整数

      return {
        errno: 0,
        data: {
          List: getQuestionList({ len: pageSize, isDeleted, isStar }), // 当前页
          total: 100, // 总数，用于分页
        },
      };
    },
  },
  // {
  //     // 更新问卷
  //     url: '/api/question/:id',
  //     method: 'patch',
  //     response() {
  //         return {
  //             errno: 0
  //         }
  //     }
  // },
  // {
  //     // 复制问卷
  //     url: '/api/question/duplicate/:id',
  //     method: 'post',
  //     response() {
  //         return {
  //             errno: 0,
  //             data: {
  //                 id: Random.id()
  //             }
  //         }
  //     }
  // },
  // {
  //     // 批量彻底删除
  //     url: '/api/question',
  //     method: 'delete',
  //     response() {
  //         return {
  //             errno: 0
  //         }
  //     }
  // }
];
