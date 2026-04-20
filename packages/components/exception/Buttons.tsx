import { Button } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'

export default function Buttons() {
  const router = useRouter()

  const onGoHome = () => {
    router.push('/')
  }

  return (
    <Button theme="primary" onClick={onGoHome}>
      回到首页
    </Button>
  )
}
