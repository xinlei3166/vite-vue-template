import { Button } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'
import { isNuxt } from '@packages/utils'

export default function Buttons() {
  const router = useRouter()

  const onGoHome = () => {
    if (isNuxt()) {
      // @ts-ignore
      navigateTo('/')
    } else {
      router.push('/')
    }
  }

  return (
    <Button theme="primary" onClick={onGoHome}>
      回到首页
    </Button>
  )
}
