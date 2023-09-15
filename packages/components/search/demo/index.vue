<template>
  <Search
    :columns="columns"
    :model="search"
    label-width="42px"
    :show-reset-btn="true"
    style="margin-bottom: 20px"
    @search="onSearch"
    @reset="onReset"
  >
    <template #name6>
      <a-select
        v-model:value="search.name6"
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
      :pagination="pagination"
      @change="onTableChange"
    >
      <a-table-column key="id" title="ID" data-index="id" />
      <a-table-column key="name" title="姓名" data-index="name" />
      <a-table-column key="age" title="年龄" data-index="age" />
      <a-table-column key="hobby" title="爱好" data-index="hobby" />
      <a-table-column key="updateTime" title="更新时间" data-index="updateTime" />
      <a-table-column key="operation" title="操作" width="150px">
        <template #default="text, record">
          <span class="btn" @click="onEdit(record)">编辑</span>
          <span class="btn" @click="onPreview(record)">预览</span>
        </template>
      </a-table-column>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, computed } from 'vue'
import type { Pagination } from '@packages/types'
import { useData } from '@packages/hooks'
import { getList } from '@/api'
import { columns } from './columns'

export default defineComponent({
  setup() {
    const params = computed(() => ({
      ...search
    }))
    const { loading, data, pagination, init, onSearch, onTableChange } = useData(getList, {
      params,
      pagination: { pageSize: 10 }
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
      pagination.current = 1
      await init()
    }

    function onEdit() {
      window.open('https://baidu.com')
    }

    function onPreview() {
      window.open('https://baidu.com')
    }

    return {
      columns,
      search,
      loading,
      data,
      pagination,
      onSearch,
      onReset,
      onTableChange,
      onEdit,
      onPreview
    }
  }
})
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
