import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Avatar from '@material-ui/core/Avatar';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withReducer from 'app/store/withReducer';
import GoogleMap from 'google-map-react';
import React, { useEffect, useState } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from '../../store';
import { resetOrder, getOrder } from '../../store/order/orderSlice';
import OrderInvoice from './OrderInvoice';
import OrdersStatus from './OrdersStatus';
import zIndex from '@material-ui/core/styles/zIndex';
import axios from 'axios';
import { tr } from 'date-fns/locale';

function Marker(props) {
	return (
		<Tooltip title={props.text} placement="top">
			<Icon className="text-red">place</Icon>
		</Tooltip>
	);
}

function Order(props) {
	const dispatch = useDispatch();
	const order = useSelector(({ app }) => app.order);
	const theme = useTheme();
	const [check, setcheck] = useState(false);
	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [noOrder, setNoOrder] = useState(false);
	const [map, setMap] = useState('shipping');

	useDeepCompareEffect(() => {
		dispatch(getOrder(routeParams)).then(action => {
			if (!action.payload) {
				setNoOrder(true);
			}
		});
	}, [dispatch, routeParams]);

	useEffect(() => {
		return () => {
			dispatch(resetOrder());
			setNoOrder(false);
		};
	}, [dispatch]);





	function handleChangeTab(event, value) {
		setTabValue(value);
	}
	function timeConverter(UNIX_timestamp) {
		var a = new Date(UNIX_timestamp * 1000);
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
		return time;
	}
	if (noOrder) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such order!
					</Typography>
					<Button
						className="mt-24"
						component={Link}
						variant="outlined"
						to="/apps/e-commerce/orders"
						color="inherit"
					>
						Go to Orders Page
					</Button>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				order && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-1 flex-col items-center sm:items-start">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/apps/e-commerce/orders"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Orders</span>
								</Typography>
							</FuseAnimate>

							<div className="flex flex-col min-w-0 items-center sm:items-start">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography className="text-16 sm:text-20 truncate">
										{`Order {order.reference}`}
									</Typography>
								</FuseAnimate>
								{console.log(order)}
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">
										{`From ${order.shippingAddress.firstname} ${order.shippingAddress.lastname}`}
									</Typography>
								</FuseAnimate>
							</div>
						</div>
					</div>
				)
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64" label="Order Details" />
					<Tab className="h-64" label="Products" />
					<Tab className="h-64" label="Invoice" />
				</Tabs>
			}
			content={
				order && (
					<div className="p-16 sm:p-24 max-w-2xl w-full">
						{/* Order Details */}
						{tabValue === 0 && (
							<div>
								<div className="pb-48">
									<div className="pb-16 flex items-center">
										<Icon color="action">account_circle</Icon>
										<Typography className="h2 mx-16" color="textSecondary">
											Customer
										</Typography>
									</div>

									<div className="mb-24">
										<div className="table-responsive mb-48">
											<table className="simple">
												<thead>
													<tr>
														<th>Name</th>
														<th>Email</th>
														<th>Phone</th>
														<th>Company</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<div className="flex items-center">
																<Typography className="truncate mx-8">
																	{`${order.shippingAddress.firstname} ${order.shippingAddress.lastname}`}
																</Typography>
															</div>
														</td>
														<td>
															<Typography className="truncate">
																{order.shippingAddress.email}
															</Typography>
														</td>
														<td>
															<Typography className="truncate">
																{order.shippingAddress.phone}
															</Typography>
														</td>
													</tr>
												</tbody>
											</table>
										</div>

										<Accordion
											className="shadow"
											expanded={map === 'shipping'}
											onChange={() => setMap(map !== 'shipping' ? 'shipping' : false)}
										>
											<AccordionSummary expandIcon={<ExpandMoreIcon />}>
												<Typography className="font-600">Shipping Address</Typography>
											</AccordionSummary>
											<AccordionDetails className="flex flex-col md:flex-row">
												<Typography className="w-full md:max-w-256 mb-16 md:mb-0">
													{order.shippingAddress.address}{' '}
													{order.shippingAddress.appartment != ''
														? ',' + order.shippingAddress.appartment
														: order.shippingAddress.appartment}{' '}
													, {order.shippingAddress.city} ,{order.shippingAddress.state} ,
													{order.shippingAddress.country}
												</Typography>
											</AccordionDetails>
										</Accordion>

										<Accordion
											className="shadow"
											expanded={map === 'invoice'}
											onChange={() => setMap(map !== 'invoice' ? 'invoice' : false)}
										>
											<AccordionSummary expandIcon={<ExpandMoreIcon />}>
												<Typography className="font-600">Invoice Address</Typography>
											</AccordionSummary>
											<AccordionDetails className="flex flex-col md:flex-row">
												<Typography className="w-full md:max-w-256 mb-16 md:mb-0">
													{/*order.customer.invoiceAddress.address*/}
												</Typography>
											</AccordionDetails>
										</Accordion>
									</div>
								</div>

								<div className="pb-48">
									<div className="pb-16 flex items-center">
										<Icon color="action">access_time</Icon>
										<Typography className="h2 mx-16" color="textSecondary">
											Order Status
										</Typography>
									</div>

									<div className="table-responsive">
										<table className="simple">
											<thead>
												<tr>
													<th>Status</th>
													<th>Updated On</th>
												</tr>
											</thead>
											<tbody>
												{/*order.status.map(status => (
													<tr key={status.id}>
														<td>
															<OrdersStatus name={status.name} />
														</td>
														<td>{status.date}</td>
													</tr>
												))*/}
											</tbody>
										</table>
									</div>
								</div>

								<div className="pb-48">
									<div className="pb-16 flex items-center">
										<Icon color="action">attach_money</Icon>
										<Typography className="h2 mx-16" color="textSecondary">
											Payment
										</Typography>
									</div>

									<div className="table-responsive">
										<table className="simple">
											<thead>
												<tr>
													<th>TransactionID</th>
													<th>Payment Method</th>
													<th>Amount</th>
													<th>Date</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<span className="truncate">{order.transactionId}</span>
													</td>
													<td>
														<span className="truncate">{order.paymentMethod}</span>
													</td>
													<td>
														<span className="truncate">{order.totalPrice}</span>
													</td>
													<td>
														<span className="truncate">
															{timeConverter(order.paymentResult.update_time)}
														</span>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<div className="pb-48">
									<div className="pb-16 flex items-center">
										<Icon color="action">local_shipping</Icon>
										<Typography className="h2 mx-12" color="textSecondary">
											Shipping
										</Typography>
									</div>

									<div className="table-responsive">
										<table className="simple">
											<thead>
												<tr>
													<th>Tracking Code</th>
													<th>Carrier</th>
													<th>Weight</th>
													<th>Fee</th>
													<th>Date</th>
												</tr>
											</thead>
											<tbody>
												{order.shippingDetails != undefined ? (
													order.shippingDetails.map(shipping => (
														<tr key={shipping.date}>
															<td>
																<span className="truncate">{shipping.tracking}</span>
															</td>
															<td>
																<span className="truncate">{shipping.carrier}</span>
															</td>
															<td>
																<span className="truncate">{shipping.weight}</span>
															</td>
															<td>
																<span className="truncate">{shipping.fee}</span>
															</td>
															<td>
																<span className="truncate">{shipping.date}</span>
															</td>
														</tr>
													))
												) : (
													<div></div>
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						)}
						{/* Products */}
						{tabValue === 1 && (
							<div className="table-responsive">
								<table className="simple">
									<thead>
										<tr>
											<th>ID</th>
											<th>Image</th>
											<th>Name</th>
											<th>Size</th>
											<th>Price</th>
											<th>Quantity</th>
											<th>Delivered</th>
										</tr>
									</thead>
									<tbody>
										{order.orderItems.map(product => (
											<tr key={product.id}>
												<td className="w-64">{product._id}</td>
												<td className="w-80">
													<img className="product-image" src={product.image} alt="product" />
												</td>
												<td>
													<Typography
														component={Link}
														to={`/apps/e-commerce/products/{product._id}`}
														className="truncate"
														style={{
															color: 'inherit',
															textDecoration: 'underline'
														}}
													>
														{product.title}
													</Typography>
												</td>
												<td className="w-64 text-right">
													<span className="truncate">{product.weight}</span>
												</td>
												<td className="w-64 text-right">
													<span className="truncate">
														{getSymbolFromCurrency(product.pricecon)}
														{product.price[0]}
													</span>
												</td>
												<td className="w-64 text-right">
													<span className="truncate">{product.count}</span>
												</td>
												<td className="w-64 text-right">
													<span className="truncate">
														<input
															type="radio"
															checked={check == true ? true : false}
															onChange={() => {
																axios.post(
																	'http://localhost:5000/api/order/delivered',
																	{
																		id: routeParams.orderId
																	}
																);
																setcheck(true);
															}}
														/>{' '}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
						{/* Invoice */}
						{tabValue === 2 && <OrderInvoice order={order} />}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('app', reducer)(Order);
