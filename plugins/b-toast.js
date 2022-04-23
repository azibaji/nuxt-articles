import Vue from 'vue'
export default ({ app }, inject) => {
  const instance = new Vue({})
  inject('toast', (title , msg , variant) => instance.$bvToast.toast(msg, {
      title: title,
      autoHideDelay: 5000,
      solid: true,
      toaster: 'b-toaster-bottom-right',
      variant: variant,
      visible: true,
      noCloseButton: true
    })
  )
}