import Mock from 'mockjs'
import qs from 'qs'
import { getUserMenu, getPermissions, getUserinfo, login, logout } from './user'
import { getList } from './data'

Mock.setup({
  timeout: 300
})

// 拦截ajax请求，配置mock的数据
Mock.mock(RegExp('/api/mock/data/list' + '.*'), 'get', getList())
Mock.mock(RegExp('/api/mock/user/menu' + '.*'), 'get', getUserMenu())
Mock.mock(RegExp('/api/mock/user/permissions' + '.*'), 'get', getPermissions())
Mock.mock(RegExp('/api/mock/user/info' + '.*'), 'get', getUserinfo())
Mock.mock('/api/mock/user/login', 'post', login())
Mock.mock('/api/mock/user/logout', 'post', logout())
