import { ref } from 'vue'
import type SearchTable from '../Table.vue'

export type SearchTableInstance = InstanceType<typeof SearchTable>

export default function useSearchTable() {
  const tableRef = ref<SearchTableInstance>()

  return { tableRef }
}
