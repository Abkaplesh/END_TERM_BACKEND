import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderPost, shippingaddressget } from "../../actions/orderaction";
import { listPrice } from "../../actions/productaction";
import { Rightinfo } from "../../components/rightinfo/rightinfo";
import "./paymentscreen.css";
import store from "../../store";
import { Link } from "react-router-dom";
import $ from "jquery";
import { setcoupon } from "../../actions/cartactions";
import queryString from "query-string";
import { useHistory } from "react-router";
import { Translate } from "react-auto-translate";

export const Paymentscreen = (props) => {
	const dispatch = useDispatch();
	const addresses = useSelector((state) => state.shipping);
	const { address } = addresses;
	const prices = useSelector((state) => state.priceList);
	const { price } = prices;
	const [r, setr] = useState(null);
	const history = useHistory();
	const coupons = useSelector((state) => state.getcoupon);
	const { coupon } = coupons;

	useEffect(() => {
		dispatch(
			shippingaddressget(JSON.parse(localStorage.getItem("userInfo")).user)
		);
		dispatch(listPrice());
	}, [dispatch]);

	useEffect(() => {
		if (coupon != null) {
			localStorage.setItem("coupon", JSON.stringify(coupon));
		}
	}, [coupon]);

	useEffect(() => {
		// Default dropdown action to show/hide dropdown content
		$(".js-dropp-action").on("click", function (e) {
			e.preventDefault();
			$(this).toggleClass("js-open");
			$(this).parent().next(".dropp-body").toggleClass("js-open");
		});

		// Using as fake input select dropdown
		$("label").on("click", function () {
			$(this).addClass("js-open").siblings().removeClass("js-open");
			$(".dropp-body,.js-dropp-action").removeClass("js-open");
		});
		// get the value of checked input radio and display as dropp title
		$('input[name="dropp"]').on("change", function () {
			var value = $("input[name='dropp']:checked").val();
			$(".js-value").text(value);
		});
	}, []);

	localStorage.setItem("curr", price);
	return (
		<div className="payment-page">
			<div className="shipping-top-info">
				<h3>PAYMENT</h3>
			</div>
			<div className="payment-left-info">
				<div className="top-logo">
					<img src="/images/logo.png" alt="logo" />
				</div>
				<div className="bottom-section">
					<section className="inner-section">
						<p className="shipping-heading"><Translate>Contact</Translate></p>
						<p>{address.shippingAddress.email}</p>
					</section>
					<section className="inner-section">
						<p className="shipping-heading"><Translate>Ship To</Translate></p>
						<p>
						{address.shippingAddress.address}{" "}
							{address.shippingAddress.appartment}{","}
							{address.shippingAddress.city}{","}
							{address.shippingAddress.state}{","} {address.shippingAddress.country}{" "}
						</p>
					</section>
				
				</div>
				<div className="last-section">
					<h2 className="saved-address"><Translate>Payment</Translate></h2>
					<p style={{ color: "#c69736" }}>
					<Translate>All transactions are end-to-end encrypted.</Translate>
					</p>
					

					{/* <button
						className="continue-btn"
						type="submit"
						onClick={price=="INR"?paymentHandler:()=>{
							props.history.push('/checkouts')
						}}
					>
						<Translate>Complete order</Translate>
					</button> */}
					<a href="/shipping"><Translate>Return to shipping</Translate></a>
					<button
					style={{display:"block"}}
						className="continue-btn"
						type="submit"
						onClick={()=>{
							dispatch(
								orderPost(
									JSON.parse(localStorage.getItem('userInfo')).user,
									'cash on delivery',
									{
										id: "",
										status: "",
										update_time: "",
										email_address: ""
									},
									localStorage.getItem('tax'),
									0,
									localStorage.getItem('total'),
									"",
									false,
									Date.now()
								)
							);
		
							if (localStorage.getItem('coupon') != '') {
								store.dispatch(setcoupon(JSON.parse(localStorage.getItem('coupon'))));
								localStorage.setItem('coupon', '');
							}
							localStorage.setItem('apply', false);
		
							
		
							axios.post('http://localhost:5000/api/postmail',{email:JSON.parse(localStorage.getItem('userInfo')).email})
		
							window.location.replace('/orders');
						}}
					>
						<Translate>Cash on delivery</Translate>
					</button>
				</div>
			</div>
			<Rightinfo />
		</div>
	);
};



const paymentHandler = async e => {
	e.preventDefault();

	const API_URL = 'http://localhost:5000/api/';
	const orderUrl = `${API_URL}payment/${localStorage.getItem('curr')}/${localStorage.getItem('total')}`;
	const response = await axios.get(orderUrl);
	const { data } = response;
	const options = {
		key: 'rzp_test_V9McTPCQ0fi6X7',
		name: 'Your App Name',
		description: 'Some Description',
		order_id: data.id,
		handler: async response => {
			try {
				const paymentId = response.razorpay_payment_id;
				const url = `${API_URL}capture/${paymentId}`;
				const captureResponse = await axios.post(url, {
					amt: localStorage.getItem('total'),
					crr: localStorage.getItem('curr')
				});
				console.log(captureResponse.data);
				if (JSON.parse(captureResponse.data.body).status == 'captured') {
					store.dispatch(
						orderPost(
							JSON.parse(localStorage.getItem('userInfo')).user,
							JSON.parse(captureResponse.data.body).method,
							{
								id: JSON.parse(captureResponse.data.body).id,
								status: JSON.parse(captureResponse.data.body).method,
								update_time: Date.now(),
								email_address: JSON.parse(captureResponse.data.body).email
							},
							localStorage.getItem('tax'),
							0,
							localStorage.getItem('total'),
							JSON.parse(captureResponse.data.body).acquirer_data.bank_transaction_id,
							true,
							JSON.parse(captureResponse.data.body).created_at
						)
					);

					if (localStorage.getItem('coupon') != '') {
						store.dispatch(setcoupon(JSON.parse(localStorage.getItem('coupon'))));
						localStorage.setItem('coupon', '');
					}
					localStorage.setItem('apply', false);

					

					axios.post('http://localhost:5000/api/postmail',{email:JSON.parse(localStorage.getItem('userInfo')).email})

					window.location.replace('/orders');
				}
			} catch (err) {
				console.log(err);
			}
		},
		theme: {
			color: '#686CFD'
		}
	};
	const rzp1 = new window.Razorpay(options);
	rzp1.open();
};