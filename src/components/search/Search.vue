<template>
  <div class="search">
    <div v-for="(column, index) in columns" :key="index" class="search-item">
      <span class="label">{{ column.label }}</span>
      <a-input
        v-if="column.searchType?.includes('input')"
        v-model:value="model[column.key]"
        class="input"
        :allow-clear="column.allowClear"
        :type="column.type"
        :placeholder="column.placeholder"
      />
      <a-select
        v-else-if="column.searchType?.includes('select')"
        v-model:value="model[column.key]"
        class="select"
        :allow-clear="column.allowClear"
        :mode="column.mode"
        :placeholder="column.placeholder"
      >
        <template v-if="typeOf(column.options) === 'array'">
          <a-select-option
            v-for="(option, optionIndex) in column.options"
            :key="optionIndex"
            :value="option.value"
          >
            {{ option.label }}
          </a-select-option>
        </template>
        <template v-else-if="typeOf(column.options) === 'object'">
          <a-select-option v-for="(label, value) in column.options" :key="value" :value="value">
            {{ label }}
          </a-select-option>
        </template>
      </a-select>
      <slot v-else-if="column.slot" :name="column.slot" />
    </div>
    <div class="search-item search-btn">
      <a-button v-if="showSearchBtn" type="primary" @click="onSearch">查询</a-button>
      <slot name="search-btn-extra" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { props } from './props'
import { typeOf } from '../../utils'

type SearchType = 'input' | 'select' | 'a-input' | 'a-select'

const getComponentName = (searchType: SearchType) => {
  return searchType.startsWith('a-') ? searchType : `a-${searchType}`
}

export default defineComponent({
  inheritAttrs: false,
  props,
  emits: ['search'],
  setup: (props, { emit }) => {
    const onSearch = () => {
      emit('search', { ...props.model })
    }

    return { getComponentName, onSearch, typeOf }
  }
})
</script>

<style lang="less" scoped>
.search {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.search-item {
  margin-right: 20px;
  margin-bottom: 16px;
}

.search-btn {
  margin-right: 0;
  margin-left: auto;
}

.label {
  margin-right: 8px;
}

.select,
.input {
  width: 240px;
}
</style>
