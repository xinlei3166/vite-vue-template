<template>
  <SearchTable
    :card="true"
    :fixedPagination="true"
    requestOnChange
    transformTableParams
    ref="tableRef"
    :searchColumns="searchColumns"
    :searchModel="search"
    search-label-width="42px"
    :search-show-reset-btn="true"
    :tableColumns="tableColumns"
    :tableEllipsis="true"
    :requestApi="getList"
    :extraParams="extraParams"
    @reset="onReset"
  >
    <template #name6>
      <t-select v-model="search.name6" class="w-full" :clearable="true" placeholder="请选择课性别">
        <t-option value="male">男</t-option>
        <t-option value="female">女</t-option>
      </t-select>
    </template>
    <template #operation="{ row }">
      <t-link theme="primary" hover="color" class="t-text-btn" @click="onEdit(row)">编辑</t-link>
      <t-link theme="primary" hover="color" class="t-text-btn" @click="onPreview(row)">预览</t-link>
    </template>
  </SearchTable>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, computed } from 'vue'
// @ts-ignore
import { getList } from '@/api'
import { searchColumns, tableColumns } from './columns'

onBeforeMount(async () => {})

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

const extraParams = computed(() => ({
  extraParams1: 'test'
}))

const onReset = () => {
  console.log('onReset')
}

const onEdit = (row: Record<string, any>) => {
  window.open('https://baidu.com')
}

const onPreview = (row: Record<string, any>) => {
  window.open('https://baidu.com')
}
</script>

<style lang="less" scoped></style>
