<template>
  <a-modal v-model:open="computedVisible" title="录音" :mask-closable="false" @cancel="onCancel">
    <div class="audio">
      <div class="audio-icon-group">
        <icon
          v-if="status === 'unstart'"
          class="audio-icon"
          type="iconaudio-fill"
          @click="onStart"
        />
        <icon v-else-if="status === 'start'" class="audio-icon" type="iconstop" @click="onStop" />
        <icon
          v-else-if="status === 'stop'"
          class="audio-icon"
          type="iconplay-circle-fill"
          @click="onPlay('play')"
        />
        <icon
          v-else-if="['play', 'resumePlay'].includes(status)"
          class="audio-icon"
          type="iconpoweroff-circle-fill"
          @click="onPlay('pausePlay')"
        />
        <icon
          v-else-if="status === 'pausePlay'"
          class="audio-icon"
          type="iconplay-circle-fill"
          @click="onPlay('resumePlay')"
        />
      </div>
      <div class="audio-info">
        <span>录音时长：{{ duration }}</span>
        <span class="ml-20">播放时长：{{ playTime }}</span>
      </div>
    </div>
    <template #footer>
      <a-button class="w-100 mr-8" :disabled="loading" @click="onRerecord">重录</a-button>
      <a-button class="w-100" type="primary" :loading="loading" @click="onConfirm">
        {{ loading ? '上传中' : '选择' }}
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  onBeforeMount,
  onBeforeUnmount,
  getCurrentInstance
} from 'vue'
import { message } from 'ant-design-vue'
import Recorder from 'js-audio-recorder'
import { convertWavToMp3, convertDurationToHMS } from '@packages/utils'
import { useCosUpload } from '@packages/hooks'

export default defineComponent({
  props: {
    visible: { type: Boolean, default: false },
    maxDuration: { type: Number, default: 120 }
  },
  emits: ['update:open', 'confirm-audio'],
  setup(props, { emit }) {
    onBeforeMount(() => {
      const instance = getCurrentInstance()
      const store = instance?.appContext.config.globalProperties.$store
      store.dispatch('COS_SDK/getTmpkeys')
    })

    const uplaod = useCosUpload('blob')

    const computedVisible = computed({
      get() {
        return props.visible
      },
      set(val) {
        emit('update:open', val)
      }
    })

    const loading = ref(false)
    const status = ref('unstart')
    const playTime = ref('00:00')
    const duration = ref('00:00')
    const fileSize = ref('0')
    let timer: any
    let recorder: any

    watch(computedVisible, val => {
      if (val && !recorder) {
        _onRerecord()
        createRecorder()
      }
    })

    function createRecorder() {
      recorder = new Recorder()
      recorder.onprogress = function (params: Record<string, any>) {
        if (params.duration >= props.maxDuration) {
          onStop()
        }
        duration.value = convertDurationToHMS(params.duration)
        fileSize.value = (params.fileSize / 1024 / 1024).toFixed(2)
      }

      recorder.onplay = function () {
        timer = setInterval(() => {
          setPlayTime()
        }, 1000)
      }

      recorder.onplayend = function () {
        setTimeout(() => {
          setPlayTime()
          status.value = 'stop' // 恢复至录音完成时的状态
          clearPlayTimeInterval()
        }, 800)
      }
    }

    function destroyRecorder() {
      recorder && recorder.destroy()
      recorder = null!
      _onRerecord()
    }

    onBeforeUnmount(() => {
      onCancel()
    })

    function setPlayTime() {
      let _playTime
      try {
        _playTime = recorder.getPlayTime()
      } catch {
        _playTime = 0
      }
      playTime.value = convertDurationToHMS(_playTime)
    }

    function clearPlayTimeInterval() {
      clearInterval(timer)
      timer = null
    }

    function onStart() {
      ;(Recorder as any).getPermission().then(
        () => {
          recorder.start()
          status.value = 'start'
        },
        (error: any) => {
          message.error('请开启麦克风权限')
          console.log(`${error.name} : ${error.message}`)
        }
      )
    }

    function onStop() {
      recorder.stop()
      status.value = 'stop'
    }

    // play ｜ stopPlay ｜ pausePlay ｜ resumePlay
    function onPlay(method: string) {
      status.value = method
      recorder[method]()
    }

    function onDownload() {
      const mp3Bolb = convertWavToMp3(recorder.getWAV())
      recorder.download(mp3Bolb, 'recorder', 'mp3')
    }

    function onUpload() {
      return uplaod(recorder.getWAVBlob(), 'correct-audio.mp3')
    }

    async function onConfirm() {
      if (recorder.duration === 0) {
        message.error('请先录制音频')
        return
      }
      loading.value = true
      const { url, key } = await onUpload()
      emit('confirm-audio', { url, key })
      onCancel()
      computedVisible.value = false
    }

    function onRerecord() {
      if (status.value === 'start') {
        message.error('请先停止录音')
        return
      }
      if (['play', 'resumePlay'].includes(status.value)) {
        message.error('请先停止播放录音')
        return
      }
      recorder.duration = 0
      _onRerecord()
    }

    function _onRerecord() {
      duration.value = '00:00'
      playTime.value = '00:00'
      status.value = 'unstart'
    }

    function onCancel() {
      loading.value = false
      clearPlayTimeInterval()
      destroyRecorder()
    }

    return {
      computedVisible,
      loading,
      status,
      duration,
      playTime,
      fileSize,
      onStart,
      onStop,
      onUpload,
      onPlay,
      onDownload,
      onConfirm,
      onRerecord,
      onCancel
    }
  }
})
</script>

<style lang="less" scoped>
.audio {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.audio-icon {
  font-size: 50px;
  color: rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}

.audio-info {
  margin-top: 24px;
  font-size: 16px;
}
</style>
