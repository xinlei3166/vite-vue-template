import { ref, reactive } from 'vue'
import { Pagination } from '../interface'

const defaultPagination: Pagination = {
  size: 'small',
  current: 1,
  defaultCurrent: 1,
  pageSize: 20,
  total: 0,
  showTotal: (total: number | string) => `共${total}条`,
  showLessItems: true,
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '40', '50']
}

export function usePagination(pagination?: Pagination) {
  const pag = pagination || {}
  const _pagination = reactive<Pagination>({ ...defaultPagination, ...pag })

  const loading = ref(false)
  const data = ref([])

  return {
    loading,
    data,
    pagination: _pagination
  }
}
