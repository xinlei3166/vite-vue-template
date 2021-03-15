<template>
  <div class="router">Router</div>
  <div class="router" style="cursor: pointer" @click="onRedirect">
    点击跳转到首页
  </div>
</template>

<script tslang="">
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

<style lang="scss" scoped>
.router {
  font-size: 24px;
  color: deeppink;
  margin-left: 100px;
  padding: 24px;
}
</style>
