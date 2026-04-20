import type { UploadProps, UploadFile, RequestMethodResponse } from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import { ref } from 'vue'
import { ContentTypeEnum } from '@packages/types/enums'
// @ts-ignore
import { uploadFile } from '@/api'

export interface UploadConfig {
  upload?: boolean
  maxCount?: number
  maxSize?: number // MB
  accept?: string // .zip,.jpg
  [key: string]: any
}

export function useUpload({ maxCount, maxSize, accept, upload = true }: UploadConfig) {
  const fileList = ref<UploadFile[]>([])
  const uploading = ref<boolean>(false)

  const beforeUpload: UploadProps['beforeUpload'] = (file: any) => {
    if (maxCount && fileList.value.length === maxCount) {
      MessagePlugin.error(`最多只能上传${maxCount}个文件`)
      return false
    }
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      MessagePlugin.error(`上传文件大小不能超过${maxSize}MB`)
      fileList.value.pop()
      return false
    }
    const suffixes = accept?.split(',') || []
    const sIndex = file.name.lastIndexOf('.')
    const suffix = file.name.slice(sIndex).toLowerCase()
    if (suffixes?.length && !suffixes.includes(suffix)) {
      MessagePlugin.error(`文件格式错误，请上传${accept}格式的文件`)
      return false
    }
    if (upload) return true
    const newFileList = [...fileList.value, file]
    fileList.value = newFileList
    console.log('fileList', newFileList)
    return false
  }

  const onRemove: UploadProps['onRemove'] = (context: any) => {
    const { index } = context
    const newFileList = fileList.value?.slice()
    newFileList?.splice(index, 1)
    fileList.value = newFileList
  }

  const onUpload = () => {
    const formData = new FormData()
    fileList.value?.forEach((file: UploadFile) => {
      formData.append('files[]', file as any)
    })
    uploading.value = true

    // request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
    //   method: 'post',
    //   data: formData
    // })
    //   .then(() => {
    //     fileList.value = []
    //     uploading.value = false
    //     MessagePlugin.success('上传成功')
    //   })
    //   .catch(() => {
    //     uploading.value = false
    //     MessagePlugin.error('上传失败')
    //   })
  }

  const createRequestMethod = (
    getParams: () => Record<string, any> = () => ({})
  ): UploadProps['requestMethod'] => {
    return async fileOrFiles => {
      const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]
      const file = files[0]

      // 1. 构造上传参数
      const formData = new FormData()
      formData.append('file', (file.raw ?? file) as any)
      const params = getParams()
      const paramKeys = Object.keys(params)
      if (paramKeys.length) {
        paramKeys.forEach(key => {
          formData.append(key, params[key])
        })
      }

      // 2. 传入定义的缩略图配置
      const thumbImageConfigs = [{ width: 600, quality: 85 }]
      if (!paramKeys.includes('thumb_image_configs')) {
        formData.append('thumb_image_configs', JSON.stringify(thumbImageConfigs))
      }

      // 3. 执行请求
      try {
        const res = await uploadFile(formData, {
          headers: { 'Content-Type': ContentTypeEnum.FormData }
          // onUploadProgress: (event: any) => {
          //   const percent = event.total ? Math.floor((event.loaded / event.total) * 100) : 0
          //   console.log('upload progress:', percent)
          // }
        })

        if (!res || res.code !== 0) {
          throw new Error(res.msg || '上传失败')
        }

        // MessagePlugin.success('上传成功')
        // 关键：返回给 TDesign 的结果
        const successResponse: RequestMethodResponse = {
          status: 'success',
          response: { ...res.data, url: res.data?.url, files }
        }
        console.log('requestMethod success', successResponse)
        return successResponse
      } catch (err: any) {
        const errorMessage = `上传失败: ${err.message}`
        MessagePlugin.error(errorMessage)
        const failResponse: RequestMethodResponse = {
          status: 'fail',
          error: errorMessage,
          response: { files }
        }
        console.error('requestMethod error', err, failResponse)
        return failResponse
      }
    }
  }
  const requestMethod = createRequestMethod()

  const onChange = ({ fileList: newFileList }: any) => {
    const list = newFileList.map((f: any) => {
      if (f.response) {
        f.url = f.response.url
      }
      return f
    })
    fileList.value = list
    console.log('fileList', list)
  }

  return {
    fileList,
    uploading,
    onRemove,
    beforeUpload,
    onUpload,
    requestMethod,
    createRequestMethod,
    onChange
  }
}
