import React from 'react';

const Home = React.lazy(() => import('../views/Home'));
const About = React.lazy(() => import('../views/About'));
const Test = React.lazy(() => import('../views/test-page/Test'));

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    exact: true,
    component: About
  },
  {
    path: '/test',
    exact: true,
    component: Test
  }
];

export default routes;
