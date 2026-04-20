import { Icon } from 'tdesign-icons-vue-next'
import './index.less'
import Buttons from '@/components/exception/Buttons'

export default function ExceptionFail() {
  return (
    <div class="result-container">
      <Icon name="error-circle" class="result-icon" />
      <div class="result-title" style={{ marginTop: 'var(--td-comp-margin-xxl)' }}>
        创建失败
      </div>
      <div class="result-desc">抱歉，您的项目创建失败，请重试</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
