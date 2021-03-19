<template>
  <a-card class="card">
    <div class="title">Draggable</div>
    <div class="draggable-wrap">
      <draggable
        v-model="arr"
        v-bind="dragOptions"
        tag="transition-group"
        :component-data="{ tag: 'div', name: 'flip-list', type: 'transition' }"
        item-key="id"
        @start="onDragStart"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <div class="row vd-draggable vd-handle">{{ element.name }}</div>
        </template>
      </draggable>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import draggable from 'vuedraggable'

interface Fruit {
  name: string
  id: number
}

export default defineComponent({
  components: { draggable },
  setup() {
    const arr = ref<Fruit[]>([
      { name: 'apple', id: 1 },
      { name: 'banana', id: 2 },
      { name: 'watermelon', id: 3 },
      { name: 'orange', id: 4 },
      { name: 'peach', id: 5 }
    ])

    const dragOptions = {
      scroll: true,
      animation: 0,
      group: 'flowRuleGroup',
      ghostClass: 'vd-ghost',
      dragClass: 'vd-ghost',
      handle: '.vd-handle',
      filter: '.vd-ignore-elements',
      preventOnFilter: false,
      draggable: '.vd-draggable',
      fallbackTolerance: 5
    }

    const drag = ref(false)

    function onDragStart() {
      drag.value = true
      window.scrollTo(0, 0)
    }

    function onDragEnd() {
      //
    }

    return { arr, dragOptions, drag, onDragStart, onDragEnd }
  }
})
</script>

<style lang="less" scoped>
.draggable-wrap {
  margin-left: 64px;

  .row {
    display: block;
    width: 600px;
    padding: 12px 20px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }

  .vd-handle {
    cursor: move;
  }

  .vd-ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }
}
</style>
