import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import CategoryConfig from 'app/main/screens/category/Config';
import DashboardConfig from 'app/main/screens/dashboard/DashboardConfig';
import BrandConfig from 'app/main/screens/brand/Config';
import CustomerConfig from 'app/main/screens/customer/Config';
import BannerConfig from 'app/main/screens/banner/Config';
import SubscriberConfig from 'app/main/screens/subscriber/Config';
import LoginConfig from 'app/main/screens/login/Config';
import CouponConfig from 'app/main/screens/coupon/Config';
import OrderConfig from 'app/main/screens/order/Config';
import ProductConfig from 'app/main/screens/product/Config';
import StateConfig from 'app/main/screens/states/Config';
import TaxConfig from 'app/main/screens/tax/Config';
import SpecsConfig from 'app/main/screens/specs/Config';
import AboutusConfig from 'app/main/screens/aboutus/Config';
import HomeConfig from 'app/main/screens/home/Config';
import Termsandcond from 'app/main/screens/termsandconditions/Config';
import PrivacyConfig from 'app/main/screens/privacy/Config';
import ReturnConfig from 'app/main/screens/return/Config';

const routeConfigs = [
	DashboardConfig,
	CategoryConfig,
	BrandConfig,
	CustomerConfig,
	LoginConfig,
	BannerConfig,
	CouponConfig,
	ProductConfig,
	OrderConfig,
	StateConfig,
	TaxConfig,
	AboutusConfig,
	SubscriberConfig,
	SpecsConfig,
	HomeConfig,
	Termsandcond,
	PrivacyConfig,
	ReturnConfig,
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/admin/dashboard" />
	}
];

export default routes;
