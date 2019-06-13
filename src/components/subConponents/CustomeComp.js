let that = ''
export default {
  props: ['render', 'rowData'],
  created() {
    that = this
  },
  render(createElement) {
    return that.render(createElement, that.rowData)
  }
}
