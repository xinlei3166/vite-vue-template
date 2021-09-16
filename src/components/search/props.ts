export const props = {
  columns: { type: Array, default: () => [] },
  model: { type: Object, default: () => ({}) },
  labelAlign: { type: String, default: 'right' }, // left | right
  labelWidth: { type: String, default: 'auto' },
  showSearchBtn: { type: Boolean, default: true },
  showResetBtn: { type: Boolean, default: true }
}
