<template>
  <div class="pb-4">
    <Search
      :columns="searchColumns"
      :model="searchModel"
      label-width="42px"
      :show-reset-btn="true"
      style="margin-bottom: 16px"
      @search="onSearch"
    >
      <template #name6="{ model, column, onChange }">
        <t-select
          v-model="model.name6"
          class="w-full"
          :clearable="true"
          @change="(value: any, context: any) => onChange(column, value, context)"
          placeholder="请选择性别"
        >
          <t-option value="male" label="男" />
          <t-option value="female" label="女" />
        </t-select>
      </template>
    </Search>
    <t-card :bordered="false" class="card" :body-style="{ padding: '16px 16px 0' }">
      <t-table
        resizable
        maxHeight="none"
        class="content"
        row-key="id"
        :loading="loading"
        :data="data"
        :columns="tableColumns"
        :pagination="pagination"
        @change="onTableChange"
      >
        <template #operation="{ row }">
          <t-link theme="primary" hover="color" class="t-text-btn" @click="onEdit(row)">
            编辑
          </t-link>
          <t-link theme="primary" hover="color" class="t-text-btn" @click="onPreview(row)">
            预览
          </t-link>
        </template>
      </t-table>
    </t-card>
  </div>
</template>

<script lang="ts" setup>
import type { TableChangeData, SortInfo } from 'tdesign-vue-next'
import { onBeforeMount, reactive, computed, ref } from 'vue'
import { useData } from '@packages/hooks'
// @ts-ignore
import { getList } from '@/api'
import { searchColumns, tableColumns } from './columns'

const params = computed(() => ({
  ...searchModel,
  ...transformTableParams({ sorter: sorter.value, filter: filter.value })
}))
const { loading, data, pagination, init, search } = useData(getList, {
  params
})

onBeforeMount(async () => {
  await init()
})

const searchModel = reactive<Record<string, any>>({
  name1: undefined,
  name2: undefined,
  name3: undefined,
  name4: undefined,
  name5: undefined,
  name6: undefined,
  name7: undefined,
  name8: undefined,
  name9: undefined,
  name10: []
})

const transformTableParams = (data: TableChangeData) => {
  const sorter = data.sorter as SortInfo
  const sortBy = sorter?.sortBy
    ? sorter.descending
      ? `-${sorter.sortBy}`
      : sorter.sortBy
    : undefined
  return { sortBy }
}

const sorter = ref()
const filter = ref()
const onTableChange = async (data: any, context: any) => {
  console.log('onTableChange', data, context)
  sorter.value = data.sorter
  filter.value = data.filter
  const { pagination: pag } = data
  if (pagination && pag) {
    pagination.current = pag.current
    pagination.pageSize = pag.pageSize
  }
  await init()
}

const onSearch = async (trigger: string, payload: Record<string, any>) => {
  console.log('onSearch', trigger, payload)
  if (trigger === 'reset') {
    await onReset()
  } else {
    await search()
  }
}

const onReset = async () => {
  Object.keys(searchModel).forEach(key => (searchModel[key] = undefined))
  searchModel['name10'] = []
  await search()
}

const onEdit = (row: Record<string, any>) => {
  window.open('https://baidu.com')
}

const onPreview = (row: Record<string, any>) => {
  window.open('https://baidu.com')
}
</script>

<style lang="less" scoped></style>
