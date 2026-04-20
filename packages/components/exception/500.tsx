import './index.less'
import Buttons from '@/components/exception/Buttons'
import InternalServerError from './images/InternalServerError'

export default function Exception500() {
  return (
    <div class="result-container">
      <div class="result-bg-img">
        <InternalServerError />
      </div>
      <div class="result-title">500 Internal Server Error</div>
      <div class="result-desc">抱歉，服务器出错啦</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
