import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import { Toast, Sidebar, Menu, Button, Modal, Input, Field, Tag, Switch, Collapse, Pagination, Upload, Icon, Tooltip, Loading } from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = true
Vue.use(Toast)
Vue.use(Sidebar)
Vue.use(Menu)
Vue.use(Button)
Vue.use(Modal)
Vue.use(Input)
Vue.use(Field)
Vue.use(Tag)
Vue.use(Switch)
Vue.use(Collapse)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Icon)
Vue.use(Tooltip)
Vue.use(Loading)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
