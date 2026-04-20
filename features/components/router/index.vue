<template>
  <t-card :bordered="false" class="card">
    <div class="title">Router</div>
    <div class="title" style="cursor: pointer" @click="onRedirect">点击跳转到首页</div>
  </t-card>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const instance = getCurrentInstance()
    // console.log(instance.proxy.$auth)
    const router = useRouter()

    const onRedirect = () => {
      router.push('/').catch(() => {})
    }

    return { onRedirect }
  }
})
</script>

<style lang="less" scoped></style>
