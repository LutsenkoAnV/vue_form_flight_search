import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCalendarAlt)

library.add(faUserPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
