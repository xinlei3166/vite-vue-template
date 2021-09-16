<template>
  <Search
    :columns="columns"
    :model="model"
    label-width="42px"
    :show-reset-btn="true"
    style="margin-bottom: 20px"
    @search="onSearch"
    @reset="onReset"
  >
    <template #name6>
      <a-select
        v-model:value="model.name6"
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
import { defineComponent, onBeforeMount } from 'vue'
import { Pagination } from '@/interface'
import { usePagination } from '@/hooks/pagination'
import { getData } from '@/api'
import Search from '@/components/search/index.vue'
import { columns, model } from './columns'

export default defineComponent({
  components: { Search },
  setup() {
    const { loading, data, pagination } = usePagination()

    onBeforeMount(async () => {
      await init()
    })

    async function init() {
      loading.value = true
      const res = await getData({ pageNum: pagination.current, pageSize: pagination.pageSize })
      loading.value = false
      if (res.code !== 0) return
      data.value = res.data
      pagination.total = res.total
    }

    async function onSearch(search: Object) {
      console.log(search)
      pagination.current = 1
      await init()
    }

    async function onReset() {
      Object.keys(model).forEach(key => (model[key] = undefined))
      pagination.current = 1
      await init()
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

    return {
      columns,
      model,
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
  color: #1890ff;
  margin-right: 10px;
  cursor: pointer;
}
</style>
