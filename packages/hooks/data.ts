import type { Ref, ComputedRef } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { ref, unref } from 'vue'
import type { Pagination } from '@packages/types'
import type { ExcelColumn } from '@packages/utils'
import { useExcel } from './excel'
import { usePagination } from './table'

interface DataOptions {
  params?: ComputedRef<Record<string, any>> | Record<string, any>
  pagination?: Pagination | false
  callback?: ({ sourceData, data }: { sourceData: any; data: any }) => void
  dataKey?: any
  method?: string
  codeKey?: string
  successCode?: string | number
}

/**
 * get data
 * @param api 请求方法
 * @param params 请求参数，此处应该传一个 ComputedRef 类型的对象
 * @param method 请求方法 get post
 * @param pagination table pagination 分页器参数, false 表示不分页
 * @param dataKey 数据key
 * @param cb callback
 * @param codeKey 请求响应 codeKey
 * @param successCode 请求响应成功 code
 */
export function useData(
  api: Function,
  {
    params,
    pagination = {},
    dataKey = 'records',
    callback,
    method = 'get',
    codeKey = 'code',
    successCode = 0
  }: DataOptions
) {
  const mergedPagination = pagination || {}
  const { loading, data, pagination: pag } = usePagination({ ...mergedPagination })
  const sourceData = ref<any>()

  const init = async (_params: Record<string, any> = {}) => {
    loading.value = true
    const page = pagination ? pag.current : undefined
    const pageSize = pagination ? pag.pageSize : undefined
    const rawParams = unref(params)
    let mergedParams: Record<string, any> = { page_size: pageSize, page, ...rawParams, ..._params }
    if (method === 'get') {
      mergedParams = { params: mergedParams }
    }
    console.log('mergedParams', mergedParams)
    const res = await api(mergedParams)
    loading.value = false
    if (!res || res[codeKey] !== successCode) return
    sourceData.value = res.data
    if (dataKey) {
      data.value = res.data[dataKey] || []
    } else {
      data.value = res.data
    }
    pag.total = res.data?.total || 0
    callback?.({ sourceData, data })
  }

  const search = async (_params: Record<string, any> = {}) => {
    pag.current = 1
    await init(_params)
  }

  return {
    loading,
    sourceData,
    data,
    pagination: pagination === false ? undefined : pag,
    init,
    search
  }
}

interface ExportOptions {
  params?: ComputedRef<Record<string, any>> | Record<string, any>
  excelFields: ExcelColumn[]
  filename?: string
  msg?: string
  dataKey?: string
  codeKey?: string
  successCode?: string | number
}

/**
 * export data
 * @param api 请求方法
 * @param params 请求参数，此处应该传一个 ComputedRef 类型的对象
 * @param excelFields excel导出字段
 * @param filename excel导出文件名
 * @param msg 导出成功提示语
 * @param dataKey 数据key
 * @param codeKey 请求响应 codeKey
 * @param successCode 请求响应成功 code
 */
export function useExport(
  api: Function,
  {
    params,
    excelFields,
    filename = 'excel.xlsx',
    msg = '导出成功',
    dataKey = 'records',
    codeKey = 'code',
    successCode = 0
  }: ExportOptions
) {
  const getExcelData = async (downloadLoading: Ref<boolean>) => {
    downloadLoading.value = true
    const rawParams = unref(params)
    const res = await api({ params: rawParams })
    downloadLoading.value = false
    if (!res || res[codeKey] !== successCode) return
    const data = ref([])
    if (dataKey) {
      data.value = res.data[dataKey] || []
    } else {
      data.value = res.data
    }
    return data.value
  }

  const { downloadLoading, exportExcel } = useExcel({ excelFields, getExcelData })

  const onExport = async () => {
    const res = await exportExcel(filename)
    if (!res) return
    MessagePlugin.success(msg)
  }

  return { downloadLoading, onExport }
}
