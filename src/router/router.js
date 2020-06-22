import Vue from 'vue';
import VueRouter from 'vue-router';
import userPage from '../pages/user.vue';
import helloPage from '../pages/hello.vue';
import errorPage from '../pages/error.vue';
import unlockPage from '../pages/unlock.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      components: {
        default: userPage,
      },
    },
    {
      path: '/user',
      name: 'user',
      component: userPage,
    },
    {
      path: '/unlock',
      name: 'unlock',
      component: unlockPage,
    },
    {
      path: '/hello',
      name: 'hello',
      component: helloPage,
    },
    {
      path: '/error',
      name: 'error',
      component: errorPage,
    },
  ],
});

