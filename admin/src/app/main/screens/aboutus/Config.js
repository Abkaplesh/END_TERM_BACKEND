import React from 'react';

const AboutusConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/aboutus/:id',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/aboutus',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default AboutusConfig;
