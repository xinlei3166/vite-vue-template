<template>
  <a-card v-if="card" class="search-card">
    <Search v-bind:="$attrs" :columns="columns" :model="model">
      <template v-for="(column, index) in columns" :key="index" #[column.slot]>
        <slot v-if="column.slot" :name="column.slot" />
      </template>
      <slot name="search-btn-extra" />
    </Search>
  </a-card>
  <Search v-else v-bind:="$attrs" :columns="columns" :model="model">
    <template v-for="(column, index) in columns" :key="index" #[column.slot]>
      <slot v-if="column.slot" :name="column.slot" />
    </template>
    <slot name="search-btn-extra" />
  </Search>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Search from './Search.vue'
import { props } from './props'

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
  ::v-deep(.ant-card-body) {
    padding: 24px 24px 8px;
  }
}
</style>
