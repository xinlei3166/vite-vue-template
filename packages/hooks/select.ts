import { ref } from 'vue'

interface Config {
  method?: 'get' | 'post'
  params?: {}
  data?: {}
}

/**
 * select remote search hook
 * @param api 搜索接口。
 * @param dataKey 数据key。
 * @param config 额外的参数对象。
 * @param config.method 请求方式。
 * @param config.method 请求方式。
 * @param config.params url参数。
 * @param config.data 请求数据主体。
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useSelectSearch<T>(api: Function, dataKey?: any, config?: Config) {
  const options = ref<T[]>([])

  /**
   * select 主动搜索方法, 参数可为空。
   * 1.进入页面调用此方法搜索数据
   * 2.例如改变另外一个筛选项的值，主动调用此方法搜索数据
   * @param params 参数
   */
  const onTrigger = async (...params: any[]) => {
    const res = await api(...params)
    if (!res || res.code !== 0) return (options.value = [])
    if (dataKey) {
      options.value = res.data?.[dataKey] || []
    } else {
      options.value = res.data || []
    }
    return options.value
  }

  // 本地搜索
  const filter = (input: string, option: any) => {
    // console.log(input, option)
    // return option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  // cascader本地搜索
  const cascaderFilter = (inputValue: string, path: Record<string, any>[]) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
  }

  return { options, onTrigger, filter, cascaderFilter }
}
