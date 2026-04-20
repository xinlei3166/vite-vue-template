import { Card } from 'tdesign-vue-next'
import './Error403.less'

export default function Error403() {
  return (
    <Card bordered={false} class="exception-wrap">
      <div class="exception-img-wrap">
        <img class="exception-img" src="@/assets/exception/web-exception.svg" />
        <span class="exception-desc">
          抱歉，您没有被授权菜单权限，如有权限需求请联系管理员为您添加权限
        </span>
      </div>
    </Card>
  )
}
