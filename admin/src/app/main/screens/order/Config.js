import React from 'react';

const OrderConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/orders/:orderId',
			component: React.lazy(() => import('./single/Order'))
		},
		{
			path: '/admin/orders',
			component: React.lazy(() => import('./Orders'))
		}
	]
};

export default OrderConfig;
