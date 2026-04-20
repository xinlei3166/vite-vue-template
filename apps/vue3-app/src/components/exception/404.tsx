import './index.less'
import Buttons from '@/components/exception/Buttons'
import NotFound from './images/NotFound'

export default function Exception404() {
  return (
    <div class="result-container">
      <div class="result-bg-img">
        <NotFound />
      </div>
      <div class="result-title">404 Not Found</div>
      <div class="result-desc">抱歉，您访问的页面不存在</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
