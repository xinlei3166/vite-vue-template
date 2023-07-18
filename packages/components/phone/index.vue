<template>
  <div class="column-wrap-phone flex items-center">
    <div :class="['phone-wrap', { loading }]" :style="{ minWidth: minWidth }">
      <a-spin v-if="loading" />
      <span v-else>{{ computedPhone }}</span>
    </div>
    <slot v-if="phone" name="extra"></slot>
    <EyeOutlined v-if="phone && btnStyle === 'icon'" class="phone-icon" @click="onShow" />
    <span v-if="phone && btnStyle === 'text'" class="text-btn ml-4" @click="onShow">
      {{ btnText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { EyeOutlined } from '@ant-design/icons-vue'
import { getPhone } from './api'

const props = defineProps({
  minWidth: { type: String, default: '90px' },
  btnStyle: { type: String, default: 'icon' }, // text, icon
  btnText: { type: String, default: '查看' },
  api: { type: Function, default: undefined },
  params: { type: Object, default: () => ({}) },
  phoneKey: { type: String, default: 'phone' },
  id: { type: [String, Number], default: -1 },
  phone: { type: [String, Number], required: true }
})

const loading = ref(false)

const id = computed(() => {
  return props.id
})
const activeId = ref()
const fullPhone = ref()

const computedPhone = computed(() => {
  return fullPhone.value || props.phone
})

const onShow = async () => {
  if (activeId.value !== id.value) {
    activeId.value = id.value
    const api = props.api || getPhone
    const res = await api(props.params)
    if (!res || res.code !== 0) return
    fullPhone.value = res.data[props.phoneKey]
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 600)
  }
}

const onReset = () => {
  activeId.value = undefined
  fullPhone.value = undefined
}

defineExpose({
  onReset
})
</script>

<style lang="less" scoped>
.column-wrap-phone {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.phone-wrap {
  display: inline-block;
  line-height: 28px;

  &.loading {
    text-align: center;
  }
}

.phone-icon {
  margin-left: 16px;
}
</style>
