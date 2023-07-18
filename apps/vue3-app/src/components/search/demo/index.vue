<template>
  <Search
    :columns="columns"
    :model="search"
    label-width="42px"
    style="margin-bottom: 20px"
    @search="onSearch"
    @reset="onReset"
  >
    <template #name6>
      <a-select
        v-model:value="search.name5"
        class="select"
        style="width: 240px"
        :allow-clear="true"
        placeholder="请选择课性别"
      >
        <a-select-option value="male">男</a-select-option>
        <a-select-option value="female">女</a-select-option>
      </a-select>
    </template>
  </Search>
  <a-card class="card">
    <a-table
      class="content"
      row-key="id"
      :loading="loading"
      :data-source="data"
      :columns="tableColumns"
      :pagination="pagination"
      @change="onTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <span class="btn" @click="onEdit(record)">编辑</span>
          <span class="btn" @click="onPreview(record)">预览</span>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, reactive } from 'vue'
import type { Pagination } from '@packages/types'
import { useData } from '@packages/hooks'
import { getList } from '@/api'
import { columns, tableColumns } from './columns'

const params = computed(() => ({
  ...search
}))
const { loading, data, pagination, init, onSearch } = useData(getList, {
  params,
  pagination: { pageSize: 10 } // 不传，默认为10
})

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
  name10: undefined
})

async function onReset() {
  Object.keys(search).forEach(key => (search[key] = undefined))
  await onSearch()
}

async function onTableChange(pag: Pagination) {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  await init()
}

function onEdit() {
  window.open('https://baidu.com')
}

function onPreview() {
  window.open('https://baidu.com')
}
</script>

<style lang="less" scoped>
.card {
  min-height: 0;
}

.btn {
  color: theme('colors.primary');
  margin-right: 10px;
  cursor: pointer;
}
</style>
