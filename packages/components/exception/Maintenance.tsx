import './index.less'
import Buttons from '@/components/exception/Buttons'
import Maintenance from './images/Maintenance'

export default function ExceptionMaintenance() {
  return (
    <div class="result-container">
      <div class="result-bg-img">
        <Maintenance />
      </div>
      <div class="result-title">系统维护中</div>
      <div class="result-desc">系统维护中，请稍后再试</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
