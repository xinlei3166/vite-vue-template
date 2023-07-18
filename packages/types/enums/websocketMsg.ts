export enum websocketMsg {
  errTitle = '提示',
  notSupport = '当前浏览器 Not support websocket',
  deviceOut = 'Ukey设备已拔出，请重新登录',
  timeOut = '设备超时，请重新登录',
  socketCloseErr = '未检测到驱动，请启动UKey客户端',
  VersionErr = 'UKey客户端版本过低,请安装新版本'
}
