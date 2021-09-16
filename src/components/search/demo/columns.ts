import { ref, reactive } from 'vue'

export interface Options {
  label: string
  value: any
}

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
    label: '国籍',
    searchType: 'select',
    mode: undefined, // multiple | tags
    options: [{ label: '中国', value: 'china' }],
    key: 'name4',
    allowClear: true,
    placeholder: '请选择城市'
  },
  {
    label: '省市区',
    searchType: 'tree-select',
    key: 'name5',
    placeholder: '请选择省市区',
    searchPlaceholder: '',
    treeData: [
      {
        title: '北京',
        value: 'bj',
        key: 'bj',
        children: [
          {
            title: '北京市',
            value: 'bjs',
            key: 'bjs',
            children: [
              {
                title: '东城区',
                value: 'dcq',
                key: 'dcq'
              },
              {
                title: '西城区',
                value: 'xcq',
                key: 'xcq'
              }
            ]
          }
        ]
      }
    ],
    treeCheckable: false,
    multiple: false,
    allowClear: true,
    showSearch: false,
    showCheckedStrategy: 'SHOW_CHILD', // SHOW_ALL, SHOW_PARENT, SHOW_CHILD
    treeDefaultExpandAll: false
  },
  {
    label: '性别',
    key: 'name6',
    slot: 'name6'
  },
  {
    label: '食物',
    searchType: 'cascader',
    options: [
      {
        value: 'chaocai',
        label: '炒菜',
        children: [
          {
            value: 'gaifan',
            label: '盖饭',
            children: [
              {
                value: 'hongshaoroufan',
                label: '红烧肉饭'
              }
            ]
          }
        ]
      }
    ],
    key: 'name7',
    allowClear: true,
    placeholder: '请选择食物'
  },
  {
    class: 'search-item-name5',
    searchType: 'select',
    labelWidth: 0,
    mode: undefined, // multiple | tags
    labelKey: 'name',
    valueKey: 'id',
    options: [
      { name: '微辣', id: 1 },
      { name: '中辣', id: 2 },
      { name: '特辣', id: 3 }
    ],
    key: 'name8',
    allowClear: true,
    placeholder: '请选择辣度'
  },
  {
    label: '生日',
    searchType: 'date-picker',
    key: 'name9',
    allowClear: true,
    placeholder: '请选择生日'
  },
  {
    label: '日期',
    searchType: 'range-picker',
    key: 'name10',
    allowClear: true,
    placeholder: ['开始日期', '结束日期']
  }
]

export const model = reactive({
  name1: undefined,
  name2: undefined,
  name3: undefined,
  name4: undefined,
  name5: undefined,
  name6: undefined,
  name7: undefined,
  name8: undefined,
  name9: undefined,
  name10: undefined
})
