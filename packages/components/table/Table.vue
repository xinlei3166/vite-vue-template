<template>
  <div
    :class="[
      'search-table-wrap',
      { '!h-full': fixedPagination, '!h-auto': !fixedPagination, 'pb-4': !fixedPagination },
      'flex',
      '!flex-col',
      $attrs.class
    ]"
    :style="$attrs.style"
  >
    <MaybeWrap :wrapper="wrapper" :wrapperProps="wrapperProps">
      <Search
        v-if="showSearch && searchColumns.length > 0"
        v-bind="searchProps"
        :card="false"
        :style="{ marginBottom: '16px', ...searchProps.style }"
        :columns="searchColumns"
        :model="searchModel"
        @search="onSearch"
        @reset="onReset"
        @enter="onSearchEnter"
        @change="onSearchChange"
        @trigger-search="onTriggerSearch"
      >
        <template v-for="name in searchSlotNames" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </Search>
      <t-table
        v-bind="tableProps"
        :class="['search-table', '!min-h-0', 'flex-1', tableProps.tableClass]"
        :max-height="tableProps.maxHeight ?? (fixedPagination ? '100%' : undefined)"
        :rowKey="rowKey"
        :resizable="tableProps.resizable ?? true"
        :hover="tableProps.hover ?? true"
        :loading="loading"
        :columns="tableColumns"
        :pagination="fixedPagination ? undefined : pagination"
        :data="data"
        @change="onTableChange"
      >
        <template v-for="name in tableSlotNames" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </t-table>
      <t-pagination
        v-if="fixedPagination && pagination"
        class="!my-4"
        v-bind="pagination"
        @change="onPaginationChange"
      />
    </MaybeWrap>
  </div>
</template>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<script lang="ts" setup>
import type { TableProps, TableChangeData, SortInfo } from 'tdesign-vue-next'
import type { PropType, CSSProperties, ComputedRef } from 'vue'
import { ref, computed, unref, toRefs, onBeforeMount, useAttrs } from 'vue'
import { useData } from '@packages/hooks'
import { deepClone } from '@packages/utils'
import type { default as SearchType } from '../search/index.vue'
import Search from '../search/index.vue'
import MaybeWrap from '../wrap/MaybeWrap.vue'

export type SearchProps = InstanceType<typeof SearchType>['$props'] & {
  class?: string
  style?: CSSProperties
}

// defineOptions({ inheritAttrs: false })

const props = defineProps({
  // table
  card: { type: Boolean, default: true },
  cardBordered: { type: Boolean, default: false },
  cardBodyStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  fixedPagination: { type: Boolean, default: true },
  rowKey: { type: [String, Function] as PropType<TableProps['rowKey']>, default: 'id' },
  tableColumns: { type: Array as PropType<TableProps['columns']>, default: () => [] },
  tableEllipsis: { type: Boolean, default: false },
  pagination: { type: Object as PropType<TableProps['pagination'] | false>, default: undefined },

  // search
  showSearch: { type: Boolean, default: true },
  searchProps: { type: Object as PropType<SearchProps>, default: () => ({}) },
  searchColumns: { type: Array as PropType<Array<Record<string, any>>>, default: () => [] },
  searchModel: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
  searchLabelWidth: {
    type: [String, Number] as PropType<SearchProps['labelWidth']>,
    default: undefined
  },
  searchShowResetBtn: { type: Boolean as PropType<SearchProps['showResetBtn']>, default: true },

  // method
  extraParams: {
    type: Object as PropType<ComputedRef<Record<string, any>> | Record<string, any>>,
    default: () => ({})
  },
  transformTableParams: {
    type: [Function, Boolean] as PropType<((...args: any[]) => Record<string, any>) | true>,
    default: () => {}
  },
  useDataParams: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
  requestApi: { type: Function as PropType<(...args: any[]) => Promise<any>>, required: true },
  requestOnMount: { type: Boolean, default: true }, // 是否在组件挂载后自动请求数据，默认为 true
  requestOnChange: { type: Boolean, default: false } // 是否在搜索条件改变时自动请求数据，默认为 false
})

const emit = defineEmits([
  'init',
  'search',
  'reset',
  'search-enter',
  'search-change',
  'trigger-search',
  'table-change'
])
const attrs = useAttrs()

// slots
const searchSlotNames = computed(() => {
  const internalNames = ['extra-btn']
  return internalNames.concat(
    (props.searchColumns || []).map((item: any) => item.slot).filter(Boolean)
  )
})
const tableSlotNames = computed(() => {
  return (props.tableColumns || [])
    .map((item: any) => {
      if (item.cell && typeof item.cell === 'string') {
        return item.cell
      }
    })
    .filter(Boolean)
})

// props
const {
  searchModel,
  pagination: _pagination,
  transformTableParams: _transformTableParams,
  useDataParams: _useDataParams
} = toRefs(props)
const searchProps = computed(() => ({
  labelWidth: props.searchLabelWidth,
  showResetBtn: props.searchShowResetBtn,
  ...props.searchProps
}))

// wrapperProps
const wrapper = computed(() => (props.card ? 'card' : undefined))
const wrapperProps = computed(() => {
  if (props.card) {
    return {
      class: ['search-table-card', { 'search-table-card--no-pagination': !pagination }, '!h-full'],
      bordered: props.cardBordered,
      bodyStyle: {
        padding: pagination ? '16px 16px 0' : '16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...props.cardBodyStyle
      }
    }
  }
  return {}
})

// tableProps
const tableProps = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})
const actionColKeys = ['row-select']
const tableColumns = computed(() => {
  return props.tableColumns.map((col: any) => {
    if (props.tableEllipsis && col.ellipsis === undefined && !actionColKeys.includes(col.colKey)) {
      return { ...col, ellipsis: true }
    }
    return col
  })
})

// sorter, filter
const sorter = ref()
const filter = ref()
const defaultTransformTableParams = (data: TableChangeData) => {
  const sorter = data.sorter as SortInfo
  const sortBy = sorter?.sortBy
    ? sorter.descending
      ? `-${sorter.sortBy}`
      : sorter.sortBy
    : undefined
  return { sortBy }
}
const transformTableParams = (data: any) => {
  // console.log('transformTableParams', typeof _transformTableParams.value, data)
  if (_transformTableParams.value === true) {
    return defaultTransformTableParams(data)
  } else if (typeof _transformTableParams.value === 'function') {
    return _transformTableParams.value(data)
  } else {
    return {}
  }
}
const tableParams = computed(() => {
  return transformTableParams({ sorter: sorter.value, filter: filter.value })
})

// useData
const params = computed(() => {
  const extraParams = unref(props.extraParams)
  return { ...searchModel.value, ...extraParams, ...tableParams.value }
})

const useDataParams = computed(() => {
  const mergedParams = deepClone(_useDataParams.value || {})
  if (_pagination?.value !== undefined) {
    mergedParams.pagination = _pagination.value
  }
  return { ...mergedParams, params }
})

const {
  loading,
  data,
  pagination,
  init: initMethod,
  onSearch: onSearchMethod,
  onTriggerSearch: _onTriggerSearch,
  onTableChange: onTableChangeMethod
} = useData(props.requestApi, useDataParams.value)

const onTableChange = (data: any, context: any) => {
  sorter.value = data.sorter
  filter.value = data.filter
  onTableChangeMethod(data, context)
  emit('table-change', data, context)
}

const onPaginationChange = (pageInfo: any) => {
  onTableChangeMethod({ pagination: pageInfo }, { trigger: 'pagination', currentData: [] })
}

// 方法回调
const init = async () => {
  await initMethod()
  emit('init')
}

const onSearch = async () => {
  await onSearchMethod()
  emit('search')
}

const onReset = async () => {
  Object.keys(searchModel.value).forEach(key => {
    const col = props.searchColumns.find((item: any) => item.key === key)
    if (col && col.defaultValue !== undefined) {
      searchModel.value[key] = col.defaultValue
    } else if (Array.isArray(searchModel.value[key])) {
      searchModel.value[key] = []
    } else {
      searchModel.value[key] = undefined
    }
  })
  await onSearchMethod()
  emit('reset')
}

const onSearchEnter = (...args: any[]) => {
  emit('search-enter', ...args)
}

const onSearchChange = (...args: any[]) => {
  emit('search-change', ...args)
}

const onTriggerSearch = async () => {
  if (props.requestOnChange) {
    await _onTriggerSearch()
  }
  emit('trigger-search')
}

// 初始化
onBeforeMount(() => {
  if (props.requestOnMount) {
    init()
  }
})

// 将方法暴露给外部
defineExpose({
  init,
  onSearch,
  onReset,
  searchModel,
  pagination,
  sorter,
  filter
})
</script>

<style lang="less" scoped></style>
