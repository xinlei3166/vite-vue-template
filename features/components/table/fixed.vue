<template>
  <a-card>
    <a-table
      class="content"
      row-key="id"
      :loading="loading"
      :data-source="data"
      :pagination="pagination"
      :scroll="{ y: 'calc(100vh - 64px - 46px - 88px - 58px - 56px)' }"
      @change="onTableChange"
    >
      <a-table-column key="id" title="ID" data-index="id" />
      <a-table-column key="name" title="姓名" data-index="name" />
      <a-table-column key="age" title="年龄" data-index="age" />
      <a-table-column key="hobby" title="爱好" data-index="hobby" />
      <a-table-column key="phone" title="手机号码" data-index="hobby" />
      <a-table-column key="email" title="邮箱" data-index="hobby" />
      <a-table-column key="updateTime" title="更新时间" data-index="updateTime" />
      <a-table-column key="operation" title="操作" width="150px">
        <template #default="text, record">
          <span class="text-btn" @click="onEdit(record)">编辑</span>
          <span class="text-btn" @click="onPreview(record)">预览</span>
        </template>
      </a-table-column>
    </a-table>
  </a-card>
</template>

<script setup lang="ts">
import { defineComponent, computed, onBeforeMount } from 'vue'
import type { Pagination } from '@packages/types'
import { useData } from '@packages/hooks'
import { getList } from '@/api'

const params = computed(() => ({}))
const { loading, data, pagination, init, onSearch } = useData(getList, {
  params,
  pagination: { pageSize: 10 } // 不传，默认为10
})
onBeforeMount(async () => {
  await init()
})

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

<style lang="less" scoped></style>
