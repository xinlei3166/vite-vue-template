import type { UploadProps, UploadFile, RequestMethodResponse } from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import { ref } from 'vue'
import { ContentTypeEnum } from '@packages/types/enums'

const uploadFile = async (...args: any[]) => {
  console.log('args', args)
  return { code: 0, msg: '', data: {} } as Record<string, any>
}

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

  const fakeRequestMethod: any = async (file: any) => {
    return new Promise(resolve => {
      let percent = 0
      const timer = setInterval(() => {
        percent += 30
        file.percent = percent // 更新进度条
        if (percent >= 100) {
          clearInterval(timer)
          resolve({
            status: 'success',
            response: { url: '' } // response 必须有，不然报错
          })
        }
      }, 200)
    })
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
        uploading.value = true
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
      } finally {
        uploading.value = false
      }
    }
  }
  const requestMethod = createRequestMethod()

  return {
    fileList,
    uploading,
    onRemove,
    beforeUpload,
    fakeRequestMethod,
    onUpload: requestMethod,
    requestMethod,
    createRequestMethod
  }
}
