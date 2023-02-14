import React from 'react';

const ReturnConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/return/:id',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/return',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default ReturnConfig;
