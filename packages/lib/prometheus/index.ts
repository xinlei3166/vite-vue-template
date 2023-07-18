import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import { deepClone, getToken } from '@packages/utils'

const config = {
  server: import.meta.env.VITE_PROMETHEUS_SERVER,
  base: import.meta.env.VITE_PROMETHEUS_BASE || '/api/v1'
}

interface PrometheusOptions {
  server?: string
  base?: string
  proxy?: boolean
  withToken?: boolean
  AuthorizationKey?: string
  errorHandler?: Function
  timeout?: number
}

interface PrometheusQueryConfig extends AxiosRequestConfig {}

interface PrometheusGetMonitorConfig {
  queryConfig?: PrometheusQueryConfig
  field?: string
  format?: string
  valueFormat?: Function
  title?: string
  name?: string | Array<string>
  yAxisName?: string
}

interface PrometheusGetServiceConfig {
  queryConfig?: PrometheusQueryConfig
}

export const chartOptionModel = {
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    name: ''
  },
  series: [
    // {
    //   data: [],
    //   type: 'line'
    // }
  ],
  legend: {
    data: []
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  title: {
    text: ''
  }
}

// Format
export const valueFormat = (value: number) => value.toFixed(2)
export const intValueFormat = (value: number) => value.toFixed(0)
export const percentValueFormat = (value: number) => (value * 100).toFixed(2)
export const memoryDiscount = 1000 * 1000 * 1000
export const memoryValueFormat = (value: number) => (value / memoryDiscount).toFixed(2)
export const memoryYAxisLabelFormatter = (value: any) => {
  const unit = value !== 0 ? 'G' : ''
  return value.toFixed(2) + unit
}

/**
 * prometheus 查询系统监控信息
 * @param options PrometheusOptions
 * @param options.server server
 * @param options.base base
 */
export const usePrometheus = (options?: PrometheusOptions) => {
  const server: any = options?.server || config.server
  const base: any = options?.base || config.base
  const proxy = options?.proxy
  const baseurl = proxy ? base : server + base
  const withToken = options?.withToken
  const AuthorizationKey = options?.AuthorizationKey || 'Authorization'
  const errorHandler = options?.errorHandler
  const timeout = options?.timeout || 60 * 1000

  /**
   * query
   * @param query 查询表达式
   * 每秒事务数 dm_global_status_tps{db="192.168.200.161:5236",}
   * 每秒查询数 dm_global_status_qps{db="192.168.200.161:5236",}
   * 每秒插入数 dm_global_status_ips{db="192.168.200.161:5236",}
   * 每秒删除数 dm_global_status_dps{db="192.168.200.161:5236",}
   * 每秒更新数 dm_global_status_ups{db="192.168.200.161:5236",}
   * 内存使用数量 dm_global_status_mem_used{db="192.168.200.161:5236",}
   * CPU使用率 dm_global_status_cpu_use_rate{db="192.168.200.161:5236",}
   * 任务平均等待时间 dm_global_status_avg_wait_time{db="192.168.200.161:5236",}
   * 线程数 dm_global_status_threads{db="192.168.200.161:5236",}
   * 金蝶监控
   * 系统CPU使用率 system_cpu_load{host="192.168.200.161",}
   * 进程CPU使用率 process_cpu_load{host="192.168.200.161",}
   * 物理内存总量 physical_memory_total_size_bytes{host="192.168.200.161",}
   * 空余内存 free_physical_memory_size_bytes{host="192.168.200.161",}
   * JVM
   * JVM线程数 jvm_threads_current{host="192.168.200.161",}
   * JVM-CodeCache jvm_memory_pool_bytes_used{pool="Code Cache",host="192.168.200.161",}
   * JVM-Metaspace jvm_memory_pool_bytes_used{pool="Metaspace",host="192.168.200.161",}
   * JVM-CompressedClassSpace jvm_memory_pool_bytes_used{pool="Compressed Class Space",host="192.168.200.161",}
   * JVM-PSEdenSpace jvm_memory_pool_bytes_used{pool="PS Eden Space",host="192.168.200.161",}
   * JVM-PSSurvivorSpace jvm_memory_pool_bytes_used{pool="PS Survivor Space",host="192.168.200.161",}
   * JVM-PSOldGen jvm_memory_pool_bytes_used{pool="PS Old Gen",host="192.168.200.161",}
   * @param params 查询表达式参数
   * @param config 查询方法配置
   */
  const query = (
    query: string,
    params: Record<string, any> = {},
    config: PrometheusQueryConfig = {}
  ): Promise<any> => {
    const url = baseurl + '/query'
    const method = config.method || 'get'
    return request({ url, method, params: { query, ...params }, ...config })
  }

  const queryRange = (
    query: string,
    params: Record<string, any>,
    config: PrometheusQueryConfig = {}
  ): Promise<any> => {
    const url = baseurl + '/query_range'
    const method = config.method || 'get'
    return request({ url, method, params: { query, ...params }, ...config })
  }

  const request = async (config: PrometheusQueryConfig = {}): Promise<any> => {
    const headers: any = withToken ? { [AuthorizationKey]: getToken() } : {}
    const res = await axios.request({ headers, timeout, ...config })
    errorHandler?.(res)
    return res
  }

  const getMonitor = async (
    _query: string,
    params: Record<string, any>,
    config: PrometheusGetMonitorConfig = {}
  ) => {
    let _res: Record<string, any>
    try {
      _res = await queryRange(_query, params, config.queryConfig)
      const res = _res.data
      if (res.status !== 'success') return
      if (res.data.resultType !== 'matrix') return

      const data: Record<string, any> = {
        data: res.data.result,
        option: deepClone(chartOptionModel),
        legendData: []
      }
      const names: string[] = [].concat((config.name || []) as any)
      const result = res.data.result as any
      for (const [i, r] of result.entries()) {
        const nameKey = ![null, '', undefined].includes(config.field!) ? config.field : '__name__'
        const name = names[i] || r.metric[nameKey as string]
        data.legendData.push(name)
        data.option.legend.data.push(name)
        data.option.series.push({
          smooth: true,
          name,
          data: r.values.map((v: any) =>
            config.valueFormat ? config.valueFormat(parseFloat(v[1])) : parseFloat(v[1])
          ),
          type: 'line'
        })
        const format = config.format || 'H:mm:ss'
        // 由于返回的时间到秒，需要使用unix处理
        data.option.xAxis.data = r.values.map((v: any) => dayjs.unix(v[0]).format(format))
      }
      data.option.yAxis.name = config.yAxisName
      data.option.title.text = config.title || names[0]

      return data
    } catch (e) {
      message.error('请求失败')
      return
    }
  }

  const getService = async (
    _query: string,
    params: Record<string, any> = {},
    config: PrometheusGetServiceConfig = {}
  ) => {
    let _res: Record<string, any>
    try {
      _res = await query(_query, params, config.queryConfig)
      const res = _res.data
      if (res.status !== 'success') return
      if (res.data.resultType !== 'vector') return
      const result = res.data.result
      return {
        data: result.map((r: Record<string, any>) => ({
          ...r.metric,
          status: r.value[1]
        })),
        legendData: result.map((r: Record<string, any>) => r.metric.name)
      }
    } catch (e) {
      message.error('请求失败')
      return
    }
  }

  const getServiceByRange = async (
    _query: string,
    params: Record<string, any> = {},
    config: PrometheusGetServiceConfig = {}
  ) => {
    let _res: Record<string, any>
    try {
      _res = await queryRange(_query, params, config.queryConfig)
      const res = _res.data
      if (res.status !== 'success') return
      if (res.data.resultType !== 'matrix') return
      const result = res.data.result
      return {
        data: result.map((r: Record<string, any>) => ({
          ...r.metric,
          status: r.values[0]?.[1]
        })),
        legendData: result.map((r: Record<string, any>) => r.metric.name)
      }
    } catch (e) {
      message.error('请求失败')
      return
    }
  }

  return { request, query, queryRange, getMonitor, getService, getServiceByRange }
}
