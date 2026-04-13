<template>
  <component
    :is="wrapper"
    v-bind="cardProps"
    :class="['search-wrap', { 'search-card': card }, $attrs.class]"
  >
    <a-row :gutter="[16, 16]" :class="['search', searchClass]" :style="searchStyle">
      <a-col
        :span="column.span || span"
        v-for="(column, index) in columns"
        :key="column.key || index"
        :class="['search-item', 'flex', 'items-center', column.class]"
      >
        <span
          v-if="showLabel && column.label"
          :class="[
            'search-item-label',
            'flex-shrink-0',
            'mr-2',
            { 'label-required': column.required }
          ]"
          :style="{ textAlign: labelAlign, width: column.labelWidth || labelWidth }"
        >
          {{ column.label }}
        </span>
        <slot v-if="column.slot" :name="column.slot" />
        <a-input
          v-else-if="column.searchType === 'input'"
          v-model:value.trim="model[column.key]"
          :style="mergeColumnStyle(column.style)"
          class="search-item-input search-item-component w-full"
          :allow-clear="column.allowClear"
          :type="column.type"
          :maxlength="column.maxLength"
          :placeholder="column.placeholder"
          @keyup.enter="(e: any) => onEnter(e, column.key)"
        />
        <a-input-number
          v-else-if="column.searchType === 'input-number'"
          v-model:value.trim="model[column.key]"
          :style="mergeColumnStyle(column.style)"
          class="search-item-input-number search-item-component w-full"
          :allow-clear="column.allowClear"
          :min="column.min"
          :max="column.max"
          :precision="column.precision"
          :decimal-separator="column.decimalSeparator"
          :step="column.step"
          :placeholder="column.placeholder"
          @keyup.enter="(e: any) => onEnter(e, column.key)"
        />
        <a-select
          v-else-if="column.searchType === 'select'"
          v-model:value="model[column.key]"
          :style="mergeColumnStyle(column.style)"
          class="search-item-select search-item-component w-full"
          :allow-clear="column.allowClear"
          :mode="column.mode"
          :show-search="column.showSearch"
          :label-in-value="column.labelInValue || false"
          :placeholder="column.placeholder"
          :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
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
          :style="mergeColumnStyle(column.style)"
          class="search-item-tree-select search-item-component w-full"
          :placeholder="column.placeholder"
          :search-placeholder="column.searchPlaceholder"
          :field-names="
            column.fieldNames || {
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
          :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
        />
        <a-cascader
          v-else-if="column.searchType === 'cascader'"
          v-model:value="model[column.key]"
          :style="mergeColumnStyle(column.style)"
          class="search-item-cascader search-item-component w-full"
          :allow-clear="column.allowClear"
          :field-names="
            column.fieldNames || { label: 'label', value: 'value', children: 'children' }
          "
          :options="column.options"
          :placeholder="column.placeholder"
          :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
        />
        <a-date-picker
          v-else-if="column.searchType === 'date-picker'"
          v-model:value="model[column.key]"
          :style="mergeColumnStyle(column.style)"
          class="search-item-date-picker search-item-component w-full"
          :allow-clear="column.allowClear"
          :format="column.format || 'YYYY-MM-DD'"
          :value-format="column.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
          :show-time="column.showTime"
          :placeholder="column.placeholder"
        />
        <a-range-picker
          v-else-if="column.searchType === 'range-picker'"
          v-model:value="model[column.key]"
          :style="mergeColumnStyle(column.style)"
          class="search-item-range-picker search-item-component w-full"
          :allow-clear="column.allowClear"
          :format="column.format || 'YYYY-MM-DD'"
          :value-format="column.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
          :show-time="column.showTime"
          :placeholder="column.placeholder"
        />
      </a-col>
      <a-col flex="1" v-if="showBtn" :class="['search-btn', btnClass]" :style="btnStyle">
        <span
          v-if="showLabel && showBtnPlaceholder"
          :class="['search-item-label', 'flex-shrink-0', 'mr-2']"
          :style="{ width: btnPlaceholderWidth || labelWidth }"
        ></span>
        <div
          :class="['search-btn-inner', 'flex', 'items-center', 'gap-4', `justify-${btnAlign}`]"
          :style="btnInnerStyle"
        >
          <a-button v-if="showSearchBtn" class="search-btn-btn" type="primary" @click="onSearch">
            {{ searchBtnLabel }}
          </a-button>
          <a-button v-if="showResetBtn" class="search-btn-btn" @click="onReset">
            {{ resetBtnLabel }}
          </a-button>
          <slot name="extra-btn" />
        </div>
      </a-col>
    </a-row>
  </component>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { Card } from 'ant-design-vue'
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { typeOf } from '@packages/utils'

type SearchType =
  | 'input'
  | 'input-number'
  | 'select'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'range-picker'

export default defineComponent({
  props: {
    card: { type: Boolean, default: true },
    span: { type: Number, default: 6 },
    searchClass: { type: String, default: '' },
    searchStyle: { type: Object, default: () => ({}) },
    columns: { type: Array as PropType<Array<Record<string, any>>>, default: () => [] },
    model: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    labelAlign: { type: String as PropType<any>, default: 'right' }, // left | right
    labelWidth: { type: [String, Number], default: 'auto' },
    showLabel: { type: Boolean, default: true }, // 显示label
    componetStyle: { type: Object, default: () => ({}) },
    showSearchBtn: { type: Boolean, default: true },
    showResetBtn: { type: Boolean, default: true },
    showBtn: { type: Boolean, default: true },
    searchBtnLabel: { type: String, default: '查询' }, // 查询, 搜索
    resetBtnLabel: { type: String, default: '重置' },
    showBtnPlaceholder: { type: Boolean, default: false }, // 显示按钮placeholder
    btnPlaceholderWidth: { type: [String, Number], default: undefined },
    btnAlign: { type: String, default: 'start' }, // start/end
    btnSpan: { type: Number, default: undefined },
    btnClass: { type: String, default: '' },
    btnStyle: { type: Object, default: () => ({}) },
    btnInnerStyle: { type: Object, default: () => ({}) }
  },
  emits: ['search', 'reset', 'enter'],
  setup(props, { emit }) {
    const wrapper = computed(() => {
      return props.card ? Card : 'div'
    })

    const cardProps = computed(() => {
      return props.card ? { bodyStyle: { padding: '20px' } } : {}
    })

    const mergeColumnStyle = (...styles: any[]) => {
      return Object.assign({}, props.componetStyle, ...styles.filter(Boolean))
    }

    const parseValue = (value: any, number: true) => {
      return number ? parseInt(value) : value
    }

    const onSearch = () => {
      emit('search')
    }

    const onReset = () => {
      emit('reset')
    }

    const onEnter = (e: any, key: string) => {
      emit('enter', key, e.target.value, { [key]: e.target.value })
    }

    return { wrapper, cardProps, mergeColumnStyle, onSearch, onReset, typeOf, parseValue, onEnter }
  }
})
</script>

<style lang="less" scoped></style>
