<template>
  <a-card v-if="card" class="search-card">
    <Search
      v-bind="$attrs"
      :inline="inline"
      :columns="columns"
      :model="model"
      :label-align="labelAlign"
      :label-width="labelWidth"
      :show-search-btn="showSearchBtn"
      :show-reset-btn="showResetBtn"
      :show-btn="showBtn"
      :btn-align="btnAlign"
      :search-btn-label="searchBtnLabel"
      :reset-btn-label="resetBtnLabel"
    >
      <template v-for="(column, index) in columns" :key="index" #[column.slot]>
        <slot v-if="column.slot" :name="column.slot" />
      </template>
      <template #extra-btn>
        <slot name="extra-btn" />
      </template>
    </Search>
  </a-card>
  <Search
    v-else
    v-bind="$attrs"
    :inline="inline"
    :columns="columns"
    :model="model"
    :label-align="labelAlign"
    :label-width="labelWidth"
    :show-search-btn="showSearchBtn"
    :show-reset-btn="showResetBtn"
    :show-btn="showBtn"
    :btn-align="btnAlign"
    :search-btn-label="searchBtnLabel"
    :reset-btn-label="resetBtnLabel"
  >
    <template v-for="(column, index) in columns" :key="index" #[column.slot]>
      <slot v-if="column.slot" :name="column.slot" />
    </template>
    <template #extra-btn>
      <slot name="extra-btn" />
    </template>
  </Search>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Search from './Search.vue'
import { props } from './props'

// select的远程搜索及其他特殊场景可用插槽实现
export default defineComponent({
  components: { Search },
  props: {
    card: { type: Boolean, default: true },
    ...props
  }
})
</script>

<style lang="less" scoped>
.search-card {
  :deep(.ant-card-body) {
    padding: 20px 24px 4px;
  }
}
</style>
