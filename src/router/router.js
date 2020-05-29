import Vue from 'vue';
import VueRouter from 'vue-router';
import userPage from '../pages/user.vue';
import helloPage from '../pages/hello.vue';


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
      path: '/hello',
      name: 'hello',
      component: helloPage,
    },
  ],
});

