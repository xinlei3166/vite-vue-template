<template>
  <SearchTable
    :card="true"
    :fixedPagination="true"
    searchOnChange
    :transformSearchParams="transformSearchParams"
    transformTableParams
    ref="tableRef"
    :searchColumns="searchColumns"
    :search-model="searchModel"
    search-label-width="42px"
    :search-show-reset-btn="true"
    :tableColumns="tableColumns"
    :tableEllipsis="true"
    :requestApi="getList"
    :extraParams="extraParams"
    @reset="onReset"
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

const extraParams = computed(() => ({
  extraParams1: 'test'
}))

const transformSearchParams = (params: Record<string, any>) => {
  return { ...params, name1: params.name1 ? `transformed-${params.name1}` : undefined }
}

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
