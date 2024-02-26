/**
 * @Date        2024/02/19 19:07:13
 * @Author      zono
 * @Description 生成假问卷列表
 * */

const Mock = require("mockjs");
const Random = Mock.Random;

function getQuestionList(opt = {}) {
  const { len = 10, isStar = false, isDeleted = false } = opt;
  const list = [];
  for (let i = 0; i < len; i++) {
    list.push({
      _id: Random.id(),
      title: Random.ctitle(),
      isPublished: Random.boolean(),
      isStar,
      answerCount: Random.natural(50, 100),
      createdAt: Random.datetime(),
      isDeleted, // 假删除，可以在回收站恢复
    });
  }
  return list;
}

module.exports = getQuestionList;
