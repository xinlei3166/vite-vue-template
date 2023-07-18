import type { Options, SortableEvent } from 'sortablejs'
import Sortable from 'sortablejs'
import type { Ref } from 'vue'
import { ref, onMounted } from 'vue'

export interface SortableOptions extends Options {
  callInternalMethods?: boolean // true: 调用内部一些方法后再执行 options 中的方法
}

const defaultOptions = {
  scroll: true,
  animation: 0,
  group: 'sortableGroup',
  ghostClass: 'sortable-ghost',
  dragClass: 'sortable-ghost',
  handle: '.sortable-handle',
  filter: '.sortable-ignore-elements',
  preventOnFilter: false,
  draggable: '.sortable-draggable',
  fallbackTolerance: 5
}

const removeNode = (node: HTMLElement) => {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node)
  }
}

const insertNodeAt = (fatherNode: HTMLElement, node: HTMLElement, position: number) => {
  const refNode =
    position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling
  fatherNode.insertBefore(node, refNode)
}

const updatePosition = (list: Ref<any[]>, oldIndex: number, newIndex: number) => {
  const item = list.value.splice(oldIndex!, 1)[0]
  list.value.splice(newIndex!, 0, { ...item })
}

export function useSortable(list: Ref<any[]>, selector: string, options: SortableOptions = {}) {
  const sortable = ref()
  const drag = ref(false)

  const _internalMethods = {
    onStart(event: SortableEvent) {
      // console.log('onStart', event)
      drag.value = true
      // window.scrollTo(0, 0)
      options.onStart?.(event)
    },
    onEnd(event: SortableEvent) {
      // console.log('onEnd', event)
      drag.value = false
      // updatePosition(list, event.oldIndex!, event.newIndex!)
      options.onEnd?.(event)
    },
    onUpdate(event: SortableEvent) {
      removeNode(event.item)
      insertNodeAt(event.from, event.item, event.oldIndex!)
      updatePosition(list, event.oldIndex!, event.newIndex!)
      options.onUpdate?.(event)
    }
  }
  let internalMethods = {}
  const callInternalMethods =
    options.callInternalMethods !== undefined ? options.callInternalMethods : true
  if (callInternalMethods) {
    internalMethods = _internalMethods
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    ...internalMethods
  }

  onMounted(() => {
    const el = document.querySelector(selector) as HTMLElement
    sortable.value = Sortable.create(el, mergedOptions)
  })

  return { sortable, drag, list }
}
