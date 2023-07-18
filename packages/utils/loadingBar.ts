import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function loadingStart() {
  NProgress.start()
}

export function loadingEnd() {
  NProgress.done()
}
