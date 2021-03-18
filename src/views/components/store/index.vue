<template>
  <a-card class="card">
    <div class="title">Store</div>
    <a-input
      v-model:value="name"
      style="margin-left: 64px; margin-right: 16px; width: 240px"
      placeholder="请输入用户名"
    />
    <a-button type="primary" @click="onSubmit">提交</a-button>
    <div class="title">当前用户：{{ userinfo.name }}</div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, toRefs } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const name = ref('君惜')
    const store = useStore()
    store.dispatch('user/setUserinfo', name.value)
    const { userinfo } = toRefs(store.state.user)
    // const userinfo = toRef(store.state.user, 'userinfo')

    function onSubmit() {
      store.dispatch('user/setUserinfo', name.value)
    }

    return { name, onSubmit, userinfo }
  }
})
</script>

<style lang="scss" scoped></style>
