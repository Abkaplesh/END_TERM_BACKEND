import React from 'react';

const Termsandcond = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/termandconditions/:id',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/termandconditions',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default Termsandcond;
