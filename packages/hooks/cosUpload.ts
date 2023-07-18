import { message } from 'ant-design-vue'
import { useCosStore } from '@/store/cos'

export interface UploadRes {
  url: string
  key: string
}

export function useCosUpload(type: string) {
  const store = useCosStore()
  // 使用之前先获取一次临时密钥 getTmpKeys
  store.getTmpKeys()
  const COS: any = store.COS
  const COS_KEYS = store.COS_KEYS
  return function cosUpload(data: any, name: string) {
    let file: any
    if (type === 'blob') {
      file = data
    } else {
      file = data.file
    }
    const fileName = file.name || name
    const fileType = file.type.split('/')[0]
    const types = ['image', 'video', 'audio']
    return new Promise<UploadRes>(function (resolve) {
      COS.sliceUploadFile(
        {
          ...COS_KEYS,
          Key: `avatar/${
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
              message.error('Access Key失效，请重新上传')
            } else {
              console.log(err)
            }
          } else {
            const { Location, Key: key } = data
            const url = 'https://' + Location
            resolve({ url, key })
          }
        }
      )
    })
  }
}
