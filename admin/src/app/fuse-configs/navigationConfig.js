import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		icon: 'dashboard',
		type: 'item',
		url: '/dashboard'
	},
	{
		id: 'category',
		title: 'Category',
		type: 'item',
		icon: 'category',
		url: '/admin/categories'
	},

	{
		id: 'banner',
		title: 'Banner',
		type: 'item',
		url: '/admin/banners',
		icon: 'view_carousel'
	},
	{
		id: 'Pages',
		title: 'Pages',
		type: 'collapse',
		icon: 'add_business',
		children: [
			{
				id: 'aboutus',
				title: 'aboutus',
				type: 'item',
				icon: 'dvr',
				url: '/admin/aboutus',
				exact: true
			},
			{
				id: 'new-product',
				title: 'Homescreen',
				type: 'item',
				icon: 'dvr',
				url: '/admin/home',
				exact: true
			},
			{
				id: 'termandcond',
				title: 'TermsAndConditions',
				type: 'item',
				icon: 'dvr',
				url: '/admin/termandconditions',
				exact: true
			},
			{
				id: 'privacy',
				title: 'Privacy Policy',
				type: 'item',
				icon: 'dvr',
				url: '/admin/privacy',
				exact: true
			},
			{
				id: 'return',
				title: 'Shipping & Returns',
				type: 'item',
				icon: 'dvr',
				url: '/admin/return',
				exact: true
			},
			// ,
			// {
			// 	id: 'product-detail',
			// 	title: 'Product Detail',
			// 	type: 'item',
			// 	url: '/products/1/a-walk-amongst-friends-canvas-print',
			// 	exact: true
			// }
		]
	},
	{
		id: 'user',
		title: 'Customer',
		type: 'item',
		url: '/admin/customers',
		icon: 'people_alt'
	},

	{
		id: 'product',
		title: 'Product',
		type: 'collapse',
		icon: 'add_business',
		children: [
			{
				id: 'product-list',
				title: 'All',
				type: 'item',
				url: '/admin/products',
				exact: true
			},
			{
				id: 'new-product',
				title: 'Add',
				type: 'item',
				url: '/admin/product/new',
				exact: true
			}
			// ,
			// {
			// 	id: 'product-detail',
			// 	title: 'Product Detail',
			// 	type: 'item',
			// 	url: '/products/1/a-walk-amongst-friends-canvas-print',
			// 	exact: true
			// }
		]
	},
	// {
	// 	id: 'order',
	// 	title: 'Order',
	// 	type: 'collapse',
	// 	children: [
	{
		id: 'orders',
		title: 'Order',
		type: 'item',
		icon: 'dvr',
		url: '/admin/orders',
		exact: true
	},
	{
		id: 'coupons',
		title: 'Coupon',
		type: 'item',
		icon: 'local_offer',
		url: '/admin/coupons',
		exact: true
	},

	{
		id: 'tax',
		title: 'Tax',
		type: 'item',
		url: '/admin/taxes',
		icon: 'dvr'
	}
];

export default navigationConfig;
