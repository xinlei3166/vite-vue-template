import { Button } from 'tdesign-vue-next'

export default function Buttons() {
  const onGoHome = () => {
    navigateTo('/')
  }

  return (
    <Button theme="primary" onClick={onGoHome}>
      回到首页
    </Button>
  )
}
