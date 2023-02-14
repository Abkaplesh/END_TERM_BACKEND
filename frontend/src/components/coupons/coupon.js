import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getcoupon, subtotal } from '../../actions/cartactions';
import { Translate } from "react-auto-translate";
import './coupons.css';

export const Coupon = () => {
	const [code, setcode] = useState('');
	const [disable, setdisable] = useState(false);
	const coupons = useSelector(state => state.getcoupon);
	const { coupon } = coupons;

	const changeHandler = e => {
		setcode(e.target.value);
	};

	useEffect(() => {
		if (coupon != null) {
			if (coupon.type == 'PERCENTAGE') {
				dispatch(subtotal(0, (parseInt(localStorage.getItem('total')) * coupon.weightage) / 100));
			} else {
				dispatch(subtotal(0,  coupon.weightage));
			}
			localStorage.setItem('apply', true);
			setdisable(localStorage.getItem('apply'));
		}
	}, [coupon]);

	const dispatch = useDispatch();
	return (
		<div className="coupon-area">
			<p><Translate>Apply Gift Code</Translate></p>
			<input type="text" placeholder="Enter Gift Code" value={code} onChange={changeHandler}></input>
			<button
				disabled={disable}
				type="submit"
				style={{ background: disable ? 'gray' : '#c69736' }}
				onClick={() => {
					dispatch(getcoupon(code));

					console.log(coupon);
					console.log(localStorage.getItem('apply'));
				}}
			>
				
				<Translate>APPLY CODE</Translate>
			</button>
		</div>
	);
};
