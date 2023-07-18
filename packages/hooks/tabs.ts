import { ref, isRef } from 'vue'
import { useRouter } from 'vue-router'
import type { TabList, TabListRef } from '@packages/types'
import { auth, typeOf } from '@packages/utils'

export function useTabs(
  tabs: TabList[] | TabListRef,
  verify = true,
  emptyHandle: Boolean | Function = true
) {
  const _tabs = isRef(tabs) ? tabs.value : tabs
  const tabList = ref(_tabs.filter(tab => !verify || auth(tab.permission!)))

  const activeTabKey = ref(tabList.value[0]?.key)

  const onTabChange = (key: any) => {
    activeTabKey.value = key
  }

  const to403 = () => {
    const router = useRouter()
    router.push('/403')
  }

  if (verify && emptyHandle && !tabList.value.length) {
    const cb = typeOf(emptyHandle) === 'function' ? emptyHandle : to403
    // @ts-ignore
    cb()
  }

  return { activeTabKey, tabList, onTabChange }
}
