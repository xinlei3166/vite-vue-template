<template>
  <div class="search">
    <div
      v-for="(column, index) in columns"
      :key="index"
      :class="['search-item', column.class ? column.class : '']"
    >
      <span
        v-if="column.label"
        :class="['label', { 'label-required': column.required }]"
        :style="{ textAlign: labelAlign, width: column.labelWidth || labelWidth }"
      >
        {{ column.label }}
      </span>
      <slot v-if="column.slot" :name="column.slot" />
      <a-input
        v-else-if="column.searchType === 'input'"
        v-model:value.trim="model[column.key]"
        class="input"
        :allow-clear="column.allowClear"
        :type="column.type"
        :maxlength="column.maxLength"
        :placeholder="column.placeholder"
        @keyup.enter="e => onEnter(e, column.key)"
      />
      <a-input-number
        v-else-if="column.searchType === 'input-number'"
        v-model:value.trim="model[column.key]"
        class="input"
        :allow-clear="column.allowClear"
        :min="column.min"
        :max="column.max"
        :precision="column.precision"
        :decimal-separator="column.decimalSeparator"
        :step="column.step"
        :placeholder="column.placeholder"
        @keyup.enter="e => onEnter(e, column.key)"
      />
      <a-select
        v-else-if="column.searchType === 'select'"
        v-model:value="model[column.key]"
        class="select"
        :allow-clear="column.allowClear"
        :mode="column.mode"
        :show-search="column.showSearch"
        :label-in-value="column.labelInValue || false"
        :placeholder="column.placeholder"
        :get-popup-container="triggerNode => triggerNode.parentNode"
      >
        <template v-if="typeOf(column.options) === 'array'">
          <a-select-option
            v-for="(option, optionIndex) in column.options"
            :key="optionIndex"
            :value="option[column.valueKey || 'value']"
          >
            {{ option[column.labelKey || 'label'] }}
          </a-select-option>
        </template>
        <template v-else-if="typeOf(column.options) === 'object'">
          <a-select-option
            v-for="(label, value) in column.options"
            :key="value"
            :value="parseValue(value, column.int || true)"
          >
            {{ label }}
          </a-select-option>
        </template>
      </a-select>
      <a-tree-select
        v-else-if="column.searchType === 'tree-select'"
        v-model:value="model[column.key]"
        class="select"
        :placeholder="column.placeholder"
        :search-placeholder="column.searchPlaceholder"
        :replace-fields="
          column.replaceFields || {
            children: 'children',
            title: 'title',
            key: 'key',
            value: 'value'
          }
        "
        :tree-data="column.treeData"
        :tree-checkable="column.treeCheckable"
        :multiple="column.multiple"
        :allow-clear="column.allowClear"
        :show-search="column.showSearch"
        :show-checked-strategy="column.showCheckedStrategy"
        :tree-default-expand-all="column.treeDefaultExpandAll"
        :get-popup-container="triggerNode => triggerNode.parentNode"
      />
      <a-cascader
        v-else-if="column.searchType === 'cascader'"
        v-model:value="model[column.key]"
        class="select"
        :allow-clear="column.allowClear"
        :field-names="column.fieldNames || { label: 'label', value: 'value', children: 'children' }"
        :options="column.options"
        :placeholder="column.placeholder"
        :get-popup-container="triggerNode => triggerNode.parentNode"
      />
      <a-date-picker
        v-else-if="column.searchType === 'date-picker'"
        v-model:value="model[column.key]"
        class="datepicker"
        :allow-clear="column.allowClear"
        :format="column.format || 'YYYY-MM-DD'"
        :value-format="column.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
        :show-time="column.showTime"
        :placeholder="column.placeholder"
      />
      <a-range-picker
        v-else-if="column.searchType === 'range-picker'"
        v-model:value="model[column.key]"
        class="datepicker"
        :allow-clear="column.allowClear"
        :format="column.format || 'YYYY-MM-DD'"
        :value-format="column.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
        :show-time="column.showTime"
        :placeholder="column.placeholder"
      />
    </div>
    <div v-if="showBtn" class="search-item search-btn">
      <a-button v-if="showSearchBtn" class="btn" type="primary" @click="onSearch">查询</a-button>
      <a-button v-if="showResetBtn" class="btn reset-btn" @click="onReset">重置</a-button>
      <slot name="extra-btn" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { props } from './props'
import { typeOf } from '@/utils'

// eslint-disable-next-line
type SearchType = 'input' | 'input-number' | 'select' | 'tree-select' | 'cascader' | 'date-picker' | 'range-picker'

export default defineComponent({
  inheritAttrs: false,
  props,
  emits: ['search', 'reset', 'enter'],
  setup(props, { emit }) {
    const parseValue = (value: string, int: true) => {
      return int ? parseInt(value) : value
    }

    const onSearch = () => {
      emit('search', { ...props.model })
    }

    const onReset = () => {
      emit('reset', { ...props.model })
    }

    const onEnter = (e: any, key: string) => {
      emit('enter', key, e.target.value, { [key]: e.target.value })
    }

    return { onSearch, onReset, typeOf, parseValue, onEnter }
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
  .btn + .btn {
    margin-left: 16px;
  }
}

.label {
  display: inline-block;
  margin-right: 8px;
}

.select,
.datepicker,
.input {
  width: 240px;
}
</style>
