import Mock from 'mockjs'

Mock.setup({
  timeout: 300
})

// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const response = function () {
  const arr = []
  for (let i = 0; i < 20; i++) {
    const obj = {
      id: i + 1,
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      age: Random.integer(1, 99), //  Random.integer( min, max )
      hobby: Random.csentence(5, 30), //  Random.csentence( min, max )
      updateTime: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式, 默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      img: Random.dataImage('300x250', 'mock的图片') // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
    }
    arr.push(obj)
  }
  return {
    code: 0,
    data: arr,
    total: 100
  }
}

// 拦截ajax请求，配置mock的数据
Mock.mock('/api/table/data', 'post', response)
