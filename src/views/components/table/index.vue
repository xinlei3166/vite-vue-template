<template>
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
</template>

<script lang="ts">
import { defineComponent, ref, reactive, inject, onBeforeMount } from 'vue'
import { Pagination } from '@/interface'
import { getData } from '@/api'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const data = ref([])
    const pagination = reactive<Pagination>({ ...inject('pagination') })

    onBeforeMount(async () => {
      await init()
    })

    async function init(_pagination?: Pagination) {
      loading.value = true
      const { current: pageNum, pageSize } = _pagination || pagination
      const res = await getData({ pageNum, pageSize })
      loading.value = false
      if (res.code !== 0) return
      data.value = res.data
      pagination.total = res.total
    }

    async function onSearch() {
      pagination.current = 1
      await init()
    }

    async function onTableChange(pagination: Pagination) {
      await init(pagination)
    }

    function onEdit() {
      window.open('https://baidu.com')
    }

    function onPreview() {
      window.open('https://baidu.com')
    }

    return { loading, data, pagination, onSearch, onTableChange, onEdit, onPreview }
  }
})
</script>

<style lang="scss" scoped>
.btn {
  color: #1890ff;
  margin-right: 10px;
  cursor: pointer;
}
</style>
