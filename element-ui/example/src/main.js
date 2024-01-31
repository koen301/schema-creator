import Vue from 'vue';
import Element from 'element-ui';
import SchemaElement from '@schema-creator/element-ui';

import App from './App.vue';
import router from './router';

import 'element-ui/lib/theme-chalk/index.css';


Vue.use(Element);
Vue.use(SchemaElement);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
