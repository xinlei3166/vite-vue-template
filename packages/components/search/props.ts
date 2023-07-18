export const props = {
  inline: { type: Boolean, default: false },
  columns: { type: Array, default: () => [] },
  model: { type: Object, default: () => ({}) },
  labelAlign: { type: String, default: 'right' }, // left | right
  labelWidth: { type: String, default: 'auto' },
  showSearchBtn: { type: Boolean, default: true },
  showResetBtn: { type: Boolean, default: true },
  showBtn: { type: Boolean, default: true },
  searchBtnLabel: { type: String, default: '查询' }, // 查询, 搜索
  resetBtnLabel: { type: String, default: '重置' },
  btnAlign: { type: String, default: 'left' } // left/right
}
