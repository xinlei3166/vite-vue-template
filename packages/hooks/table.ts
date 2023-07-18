import { ref, reactive } from 'vue'
import type { Pagination } from '@packages/types'

const defaultPagination: Pagination = {
  size: 'small',
  current: 1,
  defaultCurrent: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number | string) => `共${total}条`,
  showLessItems: true,
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '50', '100']
}

export function usePagination(pagination?: Record<string, any>) {
  const pag = pagination || {}
  const _pagination: Pagination | false = reactive<Pagination>({ ...defaultPagination, ...pag })

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

  const onChange = (_selectedRowKeys: (string | number)[], _selectedRows: any[]) => {
    selectedRowKeys.value = _selectedRowKeys
    selectedRows.value = _selectedRows
  }

  const onSelect = (record: any, selected: boolean, selectedRows: any[]) => {
    //
  }

  const onSelectAll = (selected: boolean, selectedRows: any[], changeRows: any[]) => {
    //
  }

  return { selectedRowKeys, selectedRows, cleanup, onChange }
}

export function useCustomRow({ rowKey = 'id' }: { rowKey: string }) {
  const currentRowKey = ref(-1)
  const lastRowKey = ref(-1)
  const rowKeys = ref<any>([])

  const customRow = (record: Record<string, any>) => ({
    onClick() {
      lastRowKey.value = currentRowKey.value
      currentRowKey.value = record[rowKey]
      rowKeys.value.push(record[rowKey])
    }
  })

  const rowClassName = (record: Record<string, any>) => {
    return rowKeys.value.includes(record[rowKey]) ? 'clicked' : ''
  }

  return { currentRowKey, lastRowKey, rowKeys, customRow, rowClassName }
}
