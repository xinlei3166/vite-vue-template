import { useRouter } from 'vue-router'

export type NavigationType = 'push' | 'replace'

export function useOpenRoute(type: NavigationType = 'push') {
  const router = useRouter()

  const openRoute = (
    name: string,
    params: Record<string, any> = {},
    query: Record<string, any> = {}
  ) => {
    ;(router as any)[type]({ name, params, query })
  }

  const openTab = (
    name: string,
    params: Record<string, any> = {},
    query: Record<string, any> = {}
  ) => {
    const route = router.resolve({ name, params, query })
    window.open(route.href)
  }

  const resolveRoute = (
    name: string,
    params: Record<string, any> = {},
    query: Record<string, any> = {}
  ) => {
    const route = router.resolve({ name, params, query })
    return route.href
  }

  return { router, openRoute, openTab, resolveRoute }
}
