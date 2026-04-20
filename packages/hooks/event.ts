// import type { Emitter } from 'mitt'
import mitt from 'mitt'

const event = mitt<Record<string, any>>()

export const useEvent = () => {
  return event
}
