import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/authentication',
    component: () => import('layouts/AuthenticationLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/authentication/LoginPage.vue'),
      },
      {
        path: 'register',
        component: () => import('pages/authentication/RegisterAccountPage.vue'),
      },
      {
        path: 'reset',
        component: () => import('pages/authentication/ResetPasswordPage.vue'),
      },
    ],
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'project/editor/',
        component: () =>
          import('pages/application/project/ProjectEditorPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
