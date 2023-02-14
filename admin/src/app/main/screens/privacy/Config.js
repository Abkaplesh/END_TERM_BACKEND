import React from 'react';

const PrivacyConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/privacy/:id',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/privacy',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default PrivacyConfig;
