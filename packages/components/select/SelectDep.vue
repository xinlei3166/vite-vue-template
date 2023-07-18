<template>
  <a-tree-select
    v-model:value="model[prop]"
    class="w-full ivu--style"
    dropdown-class-name="ivu--style"
    :field-names="{ children: 'children', label: 'deptName', value: 'deptTreeNo' }"
    :tree-data="deps"
    :load-data="loadData"
    allow-clear
    placeholder="请选择所属单位"
    :get-popup-container="triggerNode => triggerNode.parentNode"
    @change="onChangeDeptId"
  >
    <template #suffixIcon>
      <Icon class="text-3.5 text-text2" type="ios-arrow-down" />
    </template>
  </a-tree-select>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { getDepartmentList } from '@/api'
import { useSelectSearch } from '@packages/hooks'

defineProps({
  model: { type: Object, default: () => ({}) },
  prop: { type: String, required: true }
})
const emit = defineEmits(['change'])

// ====================== Hooks ======================
const { options: singleDeps, onTrigger: onSearchDep } = useSelectSearch(getDepartmentList)

// ====================== Lifecycle ======================
onBeforeMount(async () => {
  await onSearchDep({})
  deps.value = singleDeps.value.map((d: Record<string, any>) => ({ ...d, isLeaf: false }))
})

// ====================== Components ======================
// TreeData
const deps = ref<any[]>([])

const loadData = async (treeNode: Record<string, any>) => {
  await onSearchDep({
    parentDeptId: treeNode.deptId,
    completeUserCount: true
  })
  if (treeNode.dataRef.children) return
  treeNode.dataRef.children = singleDeps.value.map(
    ({ deptId, deptName, deptTreeNo, userCount }) => ({
      deptId,
      deptTreeNo,
      deptName,
      userCount
    })
  )
  deps.value = [...deps.value]
}

const onChangeDeptId = (value: any) => {
  emit('change', value)
}
</script>

<style scoped lang="less"></style>
