import Vue from 'vue'
import Router from 'vue-router'
import jobDetail from '@/components/details/jobDetail'
import list from '@/components/list'
import managerDetail from '@/components/details/managerDetail'
import personDetail from '@/components/details/personDetail'
import companyDetail from '@/components/details/companyDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/managerDetail',
      name: 'managerDetail',
      component: managerDetail
    },
    {
      path: '/jobDetail/:jid',
      name: 'jobDetail',
      component: jobDetail
    },
    {
      path: '/personDetail',
      name: 'personDetail',
      component: personDetail
    },
    {
      path: '/companyDetail',
      name: 'companyDetail',
      component: companyDetail
    },
  ]
})
