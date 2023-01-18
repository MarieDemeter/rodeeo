import { createRouter, createWebHistory } from 'vue-router';

import Posts from '@/components/Post/Posts.vue';
import Post from '@/components/Post/Post.vue';
import AddPost from '@/components/Post/AddPost.vue';
import PostByOwner from '@/components/Post/PostByOwner.vue';
import UpdatePost from '@/components/Post/UpdatePost.vue';
import Users from '@/components/User/Users.vue';
import User from '@/components/User/User.vue';
import AddUser from '@/components/User/AddUser.vue';
import UpdateUser from '@/components/User/UpdateUser.vue';

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: Posts,
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
                path: 'user/:userId',
                name: 'PostByOwner',
                component: PostByOwner,
            },
            {
                path: 'add',
                name: 'AddPost',
                component: AddPost,
            },
            {
                path: 'update/:id',
                name: 'UpdatePost',
                component: UpdatePost,
            },
        ],
    },
    {
        path: '/users',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                name: 'Users',
                component: Users,
            },
            {
                path: ':id',
                name: 'User',
                component: User,
            },
            {
                path: 'addUser',
                name: 'AddUser',
                component: AddUser,
            },
            {
                path: 'updateUser/:id',
                name: 'UpdateUser',
                component: UpdateUser,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;