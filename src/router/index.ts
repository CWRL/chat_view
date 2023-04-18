import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/layout',
      children:[
        {
          path:'layout',
          component:()=>import('../components/layout.vue'),
          redirect:'/layout/chat',
          children:[
            {
              path:'chat',
              component:()=>import('../views/chat/index.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
