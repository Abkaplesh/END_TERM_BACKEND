import { combineReducers } from '@reduxjs/toolkit';
import order from './order/orderSlice';
import orders from './order/ordersSlice';
import product from './product/productSlice';
import products from './product/productsSlice';
import brand from './brand/brandSlice';
import brands from './brand/brandsSlice';
import spec from './specs/specSlice';
import specs from './specs/specsSlice';
import coupon from './coupon/couponSlice';
import coupons from './coupon/couponsSlice';
import category from './category/categorySlice';
import categories from './category/categoriesSlice';
import customer from './customer/customersSlice';
import customers from './customer/customersSlice';
import banner from './banner/bannerSlice';
import banners from './banner/bannersSlice';
import subscribers from './subscriber/subscribersSlice';
import state from './state/stateSlice';
import states from './state/statesSlice';
import tax from './tax/taxSlice';
import taxes from './tax/taxesSlice';
import aboutus from './aboutus/bannerSlice';
import aboutuss from './aboutus/bannersSlice';
import home from './home/bannerSlice';
import homes from './home/bannersSlice';
import termsandcond from './termsandcond/bannerSlice';
import termsandconds from './termsandcond/bannersSlice';
import privacy from './privacy/bannerSlice';
import privacys from './privacy/bannersSlice';
import returns from './return/bannerSlice';
import returnss from './return/bannersSlice';



const reducer = combineReducers({
	products,
	product,
	orders,
	order,
	brand,
	brands,
	spec,
	specs,
	coupon,
	coupons,
	customer,
	customers,
	category,
	categories,
	banner,
	banners,
	subscribers,
	state,
	states,
	tax,
	taxes,
	aboutus,
	aboutuss,
	home,
	homes,
	termsandcond,
	termsandconds,
	privacy,
	privacys,
	returns,
	returnss
});

export default reducer;
