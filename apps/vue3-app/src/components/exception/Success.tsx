import { Icon } from 'tdesign-icons-vue-next'
import './index.less'
import Buttons from '@/components/exception/Buttons'

export default function ExceptionSuccess() {
  return (
    <div class="result-container">
      <Icon name="check-circle" class="result-icon" style={{ color: 'var(--td-success-color)' }} />
      <div class="result-title" style={{ marginTop: 'var(--td-comp-margin-xxl)' }}>
        创建成功
      </div>
      <div class="result-desc">您的项目已成功创建</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
