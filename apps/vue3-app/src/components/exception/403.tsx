import './index.less'
import Buttons from '@/components/exception/Buttons'
import Forbidden from './images/Forbidden'

export default function Exception403() {
  return (
    <div class="result-container">
      <div class="result-bg-img">
        <Forbidden />
      </div>
      <div class="result-title">403 Forbidden</div>
      <div class="result-desc">抱歉，您无权限访问此页面，请联系管理员</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
