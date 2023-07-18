<template>
  <a-card class="card">
    <div class="title">Sortable</div>
    <div class="sortable-wrap">
      <transition-group name="flip-list">
        <div v-for="item in list" :key="item.id" class="row sortable-draggable sortable-handle">
          {{ item.name }}
        </div>
      </transition-group>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useSortable } from '@packages/hooks'

interface Fruit {
  name: string
  id: string | number
}

const list = ref<Fruit[]>([
  { name: 'apple', id: '1' },
  { name: 'banana', id: '2' },
  { name: 'watermelon', id: '3' },
  { name: 'orange', id: '4' },
  { name: 'peach', id: '5' }
])

useSortable(list, '.sortable-wrap')
</script>

<style lang="less" scoped>
@import '@packages/styles/sortable.less';
</style>
