import React from 'react';

const HomeConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/home/:id',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/home',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default HomeConfig;
