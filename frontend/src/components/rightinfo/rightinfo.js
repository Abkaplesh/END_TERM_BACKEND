import getSymbolFromCurrency from 'currency-symbol-map';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartlist, gettax, subtotalget } from '../../actions/cartactions';
import { listPrice } from '../../actions/productaction';
import { getcoupon, subtotal } from '../../actions/cartactions';
import { Translate } from "react-auto-translate";

export const Rightinfo = () => {
	const dispatch = useDispatch();

	const cartList = useSelector(state => state.addCart);
	const prices = useSelector(state => state.priceList);
	const subtotals = useSelector(state => state.subtotal);
	const [code, setcode] = useState('');
	const [disable, setdisable] = useState(false);
	const coupons = useSelector(state => state.getcoupon);
	const { coupon } = coupons;

	const { sub } = subtotals;
	const { price } = prices;

	const { cart } = cartList;
	
	useEffect(() => {
		dispatch(cartlist(JSON.parse(localStorage.getItem('userInfo')).user));
		dispatch(listPrice());
	}, [dispatch]);

	useEffect(() => {
		if (coupon != null) {
			localStorage.setItem('coupon', JSON.stringify(coupon));
		}
	}, [coupon]);

	const changeHandler = e => {
		setcode(e.target.value);
	};
	useEffect(() => {
		if (localStorage.getItem('apply') == 'false') {
			setdisable(false);
		} else {
			setdisable(true);
		}
	}, []);

	console.log(disable);

	useEffect(() => {
		if (coupon != null && disable != true) {
			if (coupon.type == 'PERCENTAGE') {
				dispatch(subtotal(0, (parseInt(localStorage.getItem('total')) * coupon.weightage) / 100));
			} else {
				dispatch(subtotal(0, parseInt(localStorage.getItem('total')) - coupon.weightage));
			}
			localStorage.setItem('apply', true);
			setdisable(localStorage.getItem('apply'));
		}
	}, [coupon]);

	return (
		<div className="right-info-2">
			<div className="inner-section-info">
				<div className="first-right-div">
					{cart.map(item => {
						return (
							<div className="rightsideinfo-div">
								<img className="item-img" src={item.image} alt="perfume" />
								<span className="item-number">{item.count}</span>
								<p className="item-name">{item.title}</p>
								<p className="item-price">
									{getSymbolFromCurrency(price)}
									{item.discountprice}
								</p>
							</div>
						);
					})}
				</div>
				
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						flexWrap: 'wrap'
					}}
				>
					<p style={{ width: '60%' }}><Translate>Subtotal</Translate></p>
					<p style={{}}>
						{getSymbolFromCurrency(price)}
						{parseFloat(localStorage.getItem('total'))-parseFloat(localStorage.getItem('tax'))}
					</p>
					<p style={{ width: '60%' }}><Translate>Shipping</Translate></p>
					<p style={{}}><Translate>Free shipping</Translate></p>
				</div>
				<div className="total-box"
					style={{
						
					}}
				>
					<p className="rightsideinfo-total">
					<Translate>Total</Translate>
					</p>
					<p className="rightsideinfo-totalprice" style={{ fontWeight: 'bolder' }}>
						{getSymbolFromCurrency(price)}
						{parseFloat(localStorage.getItem('total'))}
					</p>
					<p className="rightsideinfo-tax"><Translate>including {parseFloat(localStorage.getItem('tax'))} in taxes</Translate></p>
				</div>
			</div>
		</div>
	);
};
