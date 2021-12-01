import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import moment from 'moment'


Vue.use(Vuelidate)
Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(String(value)).format('dddd, MMMM Do YYYY')
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
