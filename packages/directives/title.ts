import type { ObjectDirective } from 'vue'

// usage: v-title="'v-title'"
export default {
  mounted(el, binding, vnode, prevNnode) {
    console.log(binding)
    document.title = binding.value
  }
} as ObjectDirective
