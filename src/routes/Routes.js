// Routes.js
import { lazy } from 'react';
import { UserOutlined, UserAddOutlined, TeamOutlined, ProfileOutlined, FileOutlined } from '@ant-design/icons';

export const publicRoutes = [
    {
        key: 'sign-up',
        label: 'Sign Up',
        path: '/sign-up',
        icon: UserAddOutlined,
        component: lazy(() => import(/* webpackChunkName: "sign-up" */ '../components/SignupPage')),
    },
];

export const protectedRoutes = [
    {
        key: 'friends',
        label: 'Friends',
        path: '/friends',
        icon: TeamOutlined,
        component: lazy(() => import(/* webpackChunkName: "friends" */ '../components/Friends')),
    },
    {
        key: 'profile',
        label: 'Profile',
        path: '/profile',
        icon: ProfileOutlined,
        component: lazy(() => import(/* webpackChunkName: "profile" */ '../components/Profile')),
    },
    {
        key: 'posts',
        label: 'Posts',
        path: '/posts',
        icon: FileOutlined,
        component: lazy(() => import(/* webpackChunkName: "posts" */ '../components/Posts')),
    }
];
