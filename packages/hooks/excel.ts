import { ref } from 'vue'
import type { ExcelColumn } from '@packages/utils'
import { exportExcel as _exportExcel } from '@packages/utils'

interface Options {
  excelFields: ExcelColumn[]
  getExcelData: Function
}

export function useExcel({ excelFields, getExcelData }: Options) {
  const downloadLoading = ref(false)
  const excelData = ref<any>([])

  const exportExcel = async (filename: string) => {
    excelData.value = await getExcelData(downloadLoading)
    if (!excelData.value) return
    await _exportExcel({ filename, columns: excelFields, data: excelData.value })
    return true
  }

  return { downloadLoading, excelData, exportExcel }
}
