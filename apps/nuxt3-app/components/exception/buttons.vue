<template>
  <a-button type="primary" @click="onGoHome">返回首页</a-button>
</template>

<script setup lang="ts">
const router = useRouter()

const onGoHome = () => {
  router.push('/')
}
</script>

<style lang="less" scoped></style>
