import Vue from 'vue';
import VueRouter from 'vue-router';
import userPage from '../pages/user.vue';
import unlockPage from '../pages/unlock.vue';

Vue.use(VueRouter);

export default new VueRouter({
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
  ],
});

