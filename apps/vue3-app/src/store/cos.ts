import COS from 'cos-js-sdk-v5'
import { defineStore } from 'pinia'
import { getQcloudTmpkeys } from '@/api'
import type { Response } from '@packages/types'

export interface CosState {
  cosKeys: object
  cos: object
  expires: number | string
}

export const useCosStore = defineStore('cos', {
  state: (): CosState => ({ cosKeys: {}, cos: {}, expires: '' }),
  getters: {
    COS_KEYS(state: CosState) {
      return state.cosKeys
    },
    COS(state: CosState) {
      return state.cos
    }
  },
  actions: {
    setCosKeys(data: any) {
      const options = {
        Bucket: data.bucket,
        Region: data.region
      }
      this.cosKeys = options
      sessionStorage.setItem('cosKeys', JSON.stringify(options))
    },
    createCOS(data: any) {
      const cosInstance = new COS({
        getAuthorization(options, callback) {
          callback({
            TmpSecretId: data.tmpSecretId,
            TmpSecretKey: data.tmpSecretKey,
            XCosSecurityToken: data.sessionToken,
            ExpiredTime: data.expiredTime,
            StartTime: data.StartTime
          })
        }
      })
      this.cos = cosInstance
      sessionStorage.setItem('cos', JSON.stringify(cosInstance))
    },
    setExpires(data: any) {
      const timeDiff = data.expiredTime - data.startTime - 600
      const date = (new Date().getTime() / 1000) as any
      const dateNow = parseInt(date)
      this.expires = dateNow + timeDiff
    },
    async getTmpKeys() {
      const date = (new Date().getTime() / 1000) as any
      const dateNow = parseInt(date) // 当前时间戳
      if (dateNow > this.expires) {
        // 初次和失效后调取
        const res = (await getQcloudTmpkeys()) as Response
        if (!res || res.code !== 0) return
        const data = res.data
        this.setExpires(data)
        this.setCosKeys(data)
        this.createCOS(data)
      }
    }
  }
})
