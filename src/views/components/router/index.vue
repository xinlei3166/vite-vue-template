<template>
  <a-card class="card">
    <div class="title">Router</div>
    <div class="title" style="cursor: pointer" @click="onRedirect">点击跳转到首页</div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    const onRedirect = () => {
      router.push('/')
    }

    return { onRedirect }
  }
})
</script>

<style lang="less" scoped></style>
