import { createRouter as createRouterNative, createWebHistory, type RouteRecordRaw, type Router } from 'vue-router';

export enum RouteNames {
    COMPANY ='company',
    STATISTICS = 'statistics',
    INFO = 'info'
}

export default function createRouter(): Router {
    const routes: RouteRecordRaw[] = [
        {
            path: '/',
            redirect: '/company'
        },
        {
            path: '/statistics',
            name: RouteNames.STATISTICS,
            component: async () => await import('@/views/Statistics.vue'),
        },
        {
          path: '/company',
          name: RouteNames.COMPANY,
          component: async () => await import('@/views/Company.vue'),
        },
        {
            path: '/company/:id',
            name: RouteNames.INFO,
            component: async () => await import('@/views/Info.vue'),
        }
    ];

    const router = createRouterNative({
        routes,
        history: createWebHistory(``),
    });

    return router; // Возвращаем объект маршрутизатора
}