import { reactive } from 'vue'

export const columns = [
  {
    label: '姓名',
    searchType: 'input',
    type: 'text',
    key: 'name1',
    allowClear: true,
    placeholder: '请输入姓名'
  },
  {
    label: '年龄',
    searchType: 'input',
    type: 'number',
    key: 'name2',
    allowClear: true,
    placeholder: '请输入年龄'
  },
  {
    label: '爱好',
    searchType: 'select',
    mode: undefined, // multiple | tags
    options: {
      1: '玩游戏',
      2: '听音乐'
    },
    key: 'name3',
    allowClear: true,
    placeholder: '请选择爱好'
  },
  {
    label: '城市',
    searchType: 'select',
    mode: undefined, // multiple | tags
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '成都', value: 'chengdu' }
    ],
    key: 'name4',
    allowClear: true,
    placeholder: '请选择城市'
  },
  {
    label: '性别',
    key: 'name5',
    slot: 'name5'
  }
]

export const model = reactive({
  name1: null,
  name2: null,
  name3: null,
  name4: null,
  name5: null
})
