<template>
  <div class="pb-4">
    <Search
      :columns="searchColumns"
      :model="search"
      label-width="42px"
      :show-reset-btn="true"
      style="margin-bottom: 16px"
      @search="onSearch"
      @reset="onReset"
    >
      <template #name6>
        <t-select v-model="search.name6" class="w-full" :clearable="true" placeholder="请选择性别">
          <t-option value="male">男</t-option>
          <t-option value="female">女</t-option>
        </t-select>
      </template>
    </Search>
    <t-card :bordered="false" class="card">
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
        <template #operation="{ record }">
          <t-link theme="primary" hover="color" class="t-text-btn" @click="onEdit(record)">
            编辑
          </t-link>
          <t-link theme="primary" hover="color" class="t-text-btn" @click="onPreview(record)">
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
  ...search,
  ...transformTableParams({ sorter: sorter.value })
}))
const {
  loading,
  data,
  pagination,
  init,
  onSearch,
  onTableChange: _onTableChange
} = useData(getList, {
  params
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
const onTableChange = (data: any, context: any) => {
  sorter.value = data.sorter
  _onTableChange(data, context)
}

onBeforeMount(async () => {
  await init()
})

const search = reactive<Record<string, any>>({
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

const onReset = async () => {
  Object.keys(search).forEach(key => (search[key] = undefined))
  search['name10'] = []
  if (pagination) {
    pagination.current = 1
  }
  await init()
}

const onEdit = (record: Record<string, any>) => {
  window.open('https://baidu.com')
}

const onPreview = (record: Record<string, any>) => {
  window.open('https://baidu.com')
}
</script>

<style lang="less" scoped></style>
