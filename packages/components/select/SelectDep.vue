<template>
  <t-tree-select
    v-model="model[prop]"
    class="w-full"
    :keys="{ children: 'children', label: 'name', value: 'id' }"
    :data="deps"
    :treeProps="{
      load: loadData
    }"
    clearable
    placeholder="请选择所属单位"
    @change="onChange"
  >
    <template #suffixIcon>
      <Icon class="text-14px text-light" type="ios-arrow-down" />
    </template>
  </t-tree-select>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useSelectSearch } from '@packages/hooks'
// @ts-ignore
import { getDepartmentList } from '@/api'

defineProps({
  model: { type: Object, default: () => ({}) },
  prop: { type: String, required: true }
})
const emit = defineEmits(['change'])

// ====================== Hooks ======================
const { options: singleDeps, onTrigger: onSearchDep } = useSelectSearch<any>(getDepartmentList)

// ====================== Lifecycle ======================
onBeforeMount(async () => {
  await onSearchDep({})
  deps.value = singleDeps.value.map((d: Record<string, any>) => ({ ...d, isLeaf: false }))
})

// ====================== Components ======================
// TreeData
const deps = ref<any[]>([])

const loadData = async (node: Record<string, any>) => {
  await onSearchDep({ parentId: node.id })
  return singleDeps.value.map(node => ({
    ...node,
    children: node.childrenCount
  }))
}

const onChange = (value: any) => {
  emit('change', value)
}
</script>

<style scoped lang="scss"></style>
