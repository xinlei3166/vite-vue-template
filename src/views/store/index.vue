<template>
  <div class="store">Store</div>
  <div class="store">当前用户：{{ userinfo.name }}</div>
</template>

<script tslang="">
import { defineComponent, toRef, toRefs } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()
    store.dispatch('user/setUserinfo')
    const { userinfo } = toRefs(store.state.user)
    // const userinfo = toRef(store.state.user, 'userinfo')

    return { userinfo }
  }
})
</script>

<style lang="scss" scoped>
.store {
  font-size: 24px;
  color: deeppink;
  margin-left: 100px;
  padding: 24px;
}
</style>
