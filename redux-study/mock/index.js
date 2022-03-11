import Mock from 'mockjs';

// 配置ajax请求时的响应时间
Mock.setup({
  timeout: '1500'
});

Mock.mock('http://api.test.com/v1/list', {
  data: {
    list: [
      '早上4点起床，锻炼身体',
      '中午下班游泳一小时',
      '晚上8点到10点，学习两个小时'
    ]
  }
});
