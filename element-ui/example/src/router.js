import Vue from 'vue';
import Router from 'vue-router';

import Example1 from './components/Example1.vue';
import Example2 from './components/Example2.vue';
import Example3 from './components/Example3.vue';
import Example4 from './components/Example4.vue';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [
        { path: '/', component: Example1 },
        { path: '/example1', component: Example1 },
        { path: '/example2', component: Example2 },
        { path: '/example3', component: Example3 },
        { path: '/example4', component: Example4 },
    ],
});