<template>
  <t-card :bordered="false" class="card">
    <div class="title">Store</div>
    <div class="flex">
      <t-input
        v-model="name"
        style="margin-left: 64px; margin-right: 16px; width: 240px"
        placeholder="请输入用户名"
      />
      <t-button theme="primary" @click="onSubmit">提交</t-button>
    </div>
    <div class="title">当前用户：{{ userinfo.name }}</div>
  </t-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
// @ts-ignore
import { useStore } from '@/store/store'

export default defineComponent({
  setup() {
    const name = ref('君惜')
    const store = useStore()
    store.setUserinfo({ name: name.value })
    const userinfo = computed(() => store.userinfo)
    // const userinfo = toRef(store.state.user, 'userinfo')

    function onSubmit() {
      store.setUserinfo({ name: name.value })
    }

    return { name, onSubmit, userinfo }
  }
})
</script>

<style lang="less" scoped></style>
