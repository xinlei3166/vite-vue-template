import './index.less'
import Buttons from '@/components/exception/Buttons'
import NetworkError from './images/NetworkError'

export default function ExceptionNetworkError() {
  return (
    <div class="result-container">
      <div class="result-bg-img">
        <NetworkError />
      </div>
      <div class="result-title">网络异常</div>
      <div class="result-desc">网络异常, 请稍后重试</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
