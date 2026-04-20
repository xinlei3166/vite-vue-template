import './index.less'
import Buttons from '@/components/exception/Buttons'
import BrowserIncompatible from './images/BrowserIncompatible'

export default function ExceptionBrowserIncompatible() {
  return (
    <div class="result-container">
      <div class="result-bg-img">
        <BrowserIncompatible />
      </div>
      <div class="result-title">浏览器不兼容</div>
      <div class="result-desc">抱歉，您正在使用的浏览器版本过低，无法打开当前网页。</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
