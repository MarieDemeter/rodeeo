import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Posts from '@/components/Post/Posts.vue';
import Post from '@/components/Post/Post.vue'
import AddPost from '@/components/Post/AddPost.vue'
import PostByOwner from '@/components/Post/PostByOwner.vue'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
            },
        ],
    },
    {
        path: '/posts',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                name: 'Posts',
                component: Posts,
            },
            {
                path: ':id',
                name: 'Post',
                component: Post,
            },
            {
                path: 'add',
                name: 'AddPost',
                component: AddPost,
            },
            {
                path: 'user/:userId',
                name: 'PostByOwner',
                component: PostByOwner,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;