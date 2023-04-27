
const routes = [
  { path: '/toolbar', component: () => import('pages/ToolBar.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/options', component: () => import('pages/IndexPage.vue') },
      { path: '/popup', component: () => import('pages/IndexPage.vue') },
      { path: '/toolbar', component: () => import('pages/ToolBar.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
