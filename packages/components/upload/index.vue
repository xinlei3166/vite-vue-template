<template>
  <div :class="['upload-wrap', { 'show-tip': !!tip }]">
    <div v-if="tip" class="tip">{{ tip }}</div>
    <a-upload
      :multiple="multiple"
      :disabled="disabled"
      :accept="accept"
      :list-type="listType"
      :file-list="fileList"
      :show-upload-list="showUploadList"
      :before-upload="beforeUpload"
      :custom-request="cosUpload"
      :remove="handleRemove"
      @preview="handlePreview"
      @download="handleDownload"
    >
      <slot>
        <div v-if="listType === 'picture-card' && fileList.length < limit">
          <PlusOutlined />
          <div class="ant-upload-text">{{ buttonText }}</div>
        </div>
        <a-button
          v-else-if="(listType === 'picture' || listType === 'text') && fileList.length < limit"
        >
          <UploadOutlined />
          {{ buttonText }}
        </a-button>
      </slot>
    </a-upload>
    <preview v-model:open="previewVisible" :src="previewImage"></preview>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useCosStore } from '@/store/cos'
import Preview from './Preview.vue'
import { message } from 'ant-design-vue'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons-vue'

export type UploadResList = {
  uid: any
  name: string
  status: 'done' | string
  key: string
  url: string
}[]

export default defineComponent({
  components: { Preview, PlusOutlined, UploadOutlined },
  props: {
    accept: { type: String, default: '.png,.jpg,.jpeg' }, // 文件类型
    listType: { type: String, default: 'picture-card' }, // 展示类型
    multiple: { type: Boolean, default: false }, // 是否支持多文件
    disabled: { type: Boolean, default: false }, // 是否禁用
    limit: { type: Number, default: 1 }, // 上传数量
    fileList: { required: true, type: Array, default: () => [] }, // 已上传文件列表
    // { showPreviewIcon?: boolean, showRemoveIcon?: boolean, showDownloadIcon?: boolean }
    showUploadList: { type: [Boolean, Object], default: () => ({ showDownloadIcon: true }) }, // 规则提示
    tip: { type: String, default: '' }, // 规则提示
    size: { type: String, default: '' }, // 文件大小
    buttonText: { type: String, default: '请上传' }
  },
  emits: ['handleSuccess', 'handleBeforeUpload'],
  setup(props, { emit }) {
    // 使用之前先获取下key
    const store = useCosStore()
    onBeforeMount(() => {
      store.getTmpKeys()
    })
    const COS: any = store.COS
    const COS_KEYS = store.COS_KEYS
    const previewVisible = ref(false)
    const previewImage = ref('')
    const cosUpload = (data: any) => {
      const { file } = data
      const fileName = file.name
      const fileType = file.type.split('/')[0]
      const types = ['image', 'video', 'audio']
      COS.sliceUploadFile(
        {
          ...COS_KEYS,
          Key: `department/avatar/${
            types.includes(fileType) ? fileType : 'file'
          }/${new Date().getTime()}/${fileName}`,
          Body: file,
          onTaskReady() {},
          onProgress() {}
        },
        (err: { statusCode: number }, data: { Location: any; Key: any }) => {
          if (err) {
            if (err.statusCode === 403) {
              store.getTmpKeys()
              message.error('Access Key失效，请重新上传！')
            } else {
              console.log(err)
            }
          } else {
            const { Location, Key } = data
            const url = 'https://' + Location
            props.fileList.push({
              uid: file.uid,
              name: file.name,
              status: 'done',
              key: Key,
              url
            })
            emit('handleSuccess', [...props.fileList])
          }
        }
      )
    }
    const beforeUpload = (file: { size: number }) => {
      try {
        return new Promise((resolve, reject) => {
          if (!props.size) {
            return resolve(true)
          }
          const size = +props.size.split('M')[0]
          const isLt = file.size / 1024 / 1024 <= size
          if (!isLt) {
            message.error(`上传文件大小不能超过 ${size}M!`)
            return reject(isLt)
          }
          return resolve(true)
        })
      } finally {
        emit('handleBeforeUpload')
      }
    }
    const handlePreview = async (file: { url: any; preview: any; originFileObj: any }) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
    }
    const handleRemove = (file: { uid: any }) => {
      const uid = file.uid
      let i = 0
      props.fileList.forEach((val: any, index: number) => {
        if (val.uid === uid) {
          i = index
        }
      })
      props.fileList.splice(i, 1)
    }
    const handleDownload = (info: { key: string; name: string }) => {
      COS.getObjectUrl(
        {
          ...COS_KEYS,
          Key: info.key,
          Sign: true
        },
        (err: any, data: { Url: string | string[] }) => {
          if (err) return console.log(err)
          const downloadUrl =
            data.Url +
            (data.Url.indexOf('?') > -1 ? '&' : '?') +
            'response-content-disposition=attachment' // 补充强制下载的参数
          const a = document.createElement('a')
          a.href = downloadUrl
          a.download = info.name
          a.style.display = 'none'
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
      )
    }
    const getBase64 = (file: Blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }

    return {
      cosUpload,
      beforeUpload,
      previewImage,
      handlePreview,
      handleRemove,
      previewVisible,
      handleDownload
    }
  }
})
</script>

<style lang="less" scoped>
.upload-wrap {
  .tip {
    font-size: 12px;
    color: theme('colors.gray.6');
  }
  &.show-tip {
    :deep(.ant-upload-picture-card-wrapper),
    :deep(.ant-upload-select-picture),
    :deep(.ant-upload-select-text) {
      margin-top: 8px;
    }
  }
  :deep(.ant-upload-select-picture-card svg) {
    font-size: 20px;
    color: theme('colors.gray.7');
  }
  :deep(.ant-upload-select-picture-card .ant-upload-text) {
    margin-top: 8px;
    color: theme('colors.gray.7');
  }
}
</style>
