import { ref, reactive } from 'vue'
import type { Pagination } from '@packages/types'

const defaultPagination: Pagination = {
  current: 1,
  pageSize: 20,
  total: 0,
  totalContent: true,
  size: 'medium',
  theme: 'default',
  pageSizeOptions: [10, 20, 30, 50, 100],
  showFirstAndLastPageBtn: false,
  showJumper: true,
  showPageNumber: true,
  showPageSize: true,
  showPreviousAndNextBtn: true
}

export function usePagination(pagination?: Record<string, any>) {
  const pag = pagination || {}
  const _pagination = reactive<Pagination>({ ...defaultPagination, ...pag })

  const loading = ref(false)
  const data = ref<Array<Record<string, any>>>([])

  return {
    loading,
    data,
    pagination: _pagination
  }
}

export function useRowSelection() {
  const selectedRowKeys = ref<any>([])
  const selectedRows = ref<any>([])

  const cleanup = () => {
    selectedRowKeys.value = []
    selectedRows.value = []
  }

  const onSelectChange = (_selectedRowKeys: any[], options: any) => {
    selectedRowKeys.value = _selectedRowKeys
    selectedRows.value = options?.selectedRowData || []
  }

  return { selectedRowKeys, selectedRows, cleanup, onSelectChange }
}

export function useCustomRow({ rowKey = 'id' }: { rowKey: string }) {
  const currentRowKey = ref(-1)
  const lastRowKey = ref(-1)
  const rowKeys = ref<any>([])

  const rowAttributes = (row: Record<string, any>) => ({
    onClick() {
      lastRowKey.value = currentRowKey.value
      currentRowKey.value = row[rowKey]
      rowKeys.value.push(row[rowKey])
    }
  })

  const rowClassName = (row: Record<string, any>) => {
    return rowKeys.value.includes(row[rowKey]) ? 'clicked' : ''
  }

  return { currentRowKey, lastRowKey, rowKeys, rowAttributes, rowClassName }
}
