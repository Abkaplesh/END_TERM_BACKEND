import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetProduct, saveProduct, getProduct, newProduct } from '../../store/product/productSlice';
import { getCategories, selectCategories } from '../../store/category/categoriesSlice';
import { getBrands, selectBrands } from '../../store/brand/brandsSlice';
import { getSpecs, selectSpecs } from '../../store/specs/specsSlice';
import { getProducts, selectProducts } from '../../store/product/productsSlice';
import { useAlert } from 'react-alert';
import reducer from '../../store';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { concat } from 'lodash';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

function Product(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	const product = useSelector(({ app }) => app.product);
	const categories = useSelector(selectCategories);
	const brands = useSelector(selectBrands);
	const specs = useSelector(selectSpecs);
	const products = useSelector(selectProducts);
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [productOptions, setProductOptions] = useState([]);
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const [noProduct, setNoProduct] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getProducts());
		dispatch(getBrands());
		dispatch(getSpecs());
	}, [dispatch]);
	useDeepCompareEffect(() => {
		function updateProductState() {
			const { productId } = routeParams;
			if (productId === 'new') {
				dispatch(newProduct());
			} else {
				dispatch(getProduct(routeParams)).then(action => {
					if (!action.payload) {
						setNoProduct(true);
					}
				});
			}
		}

		updateProductState();
	}, [dispatch, routeParams]);

	useEffect(async () => {
		const response = await axios.get('http://localhost:5000/api/procategory');
		setCategoryOptions(response.data);
	}, [categories]);
	console.log(categoryOptions);
	useEffect(() => {
		if (products) {
			const productSuggestions = products.map(product => ({ value: product._id, label: product.name }));
			setProductOptions(productSuggestions);
		}
	}, [products]);

	useEffect(() => {
		if ((product && !form) || (product && form && product._id !== form._id)) {
			setForm(product);
		}
	}, [form, product, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetProduct());
			setNoProduct(false);
		};
	}, [dispatch]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function handleUploadChange(e) {
		let files = [];
		for (let i = 0; i < e.target.files.length; i++) {
			let file = e.target.files[i];
			if (!file) {
				return;
			}
			const reader = new FileReader();
			reader.readAsBinaryString(file);
			reader.onload = () => {
				files.push(`data:${file.type};base64,${btoa(reader.result)}`);
				setForm(_.set({ ...form }, `images`, [...form.images, ...files]));
			};

			reader.onerror = () => {
				console.log('error on load image');
			};
		}
	}

	function canBeSubmitted() {
		return (
			form.title != undefined &&
			form.arabictitle != undefined &&
			form.size != undefined &&
			form.category != undefined &&
			form.short != undefined &&
			form.description != undefined &&
			form.arabicdescription != undefined &&
			form.INR != undefined &&
			form.discount_price_INR != undefined &&
			form.SAR != undefined &&
			form.discount_price_SAR != undefined &&
			form.AED != undefined &&
			form.discount_price_AED != undefined &&
			form.stockind != undefined &&
			form.stockksa != undefined &&
			form.stockuae != undefined
		);
	}
	function saveSuccess() {
		alert.success('Saved');
		props.history.push('/admin/products');
	}

	function handleAttrChange(value, specId) {
		let attrs = {};
		if (form.attrs) {
			attrs = form.attrs;
		}
		attrs[specId] = value;
		setForm(_.set({ ...form }, `attrs`, attrs));
	}

	function removeImage(index) {
		let images = [...form.images];
		images.splice(index, 1);
		setForm(_.set({ ...form }, `images`, [...images]));
	}

	function setAttributes(specId) {
		let attrs = {};
		let spec = specs.filter(spec => spec._id == specId);
		spec[0].attrs.map(attr => (attrs[attr._id] = ''));
		// if(form.attrs) {
		// 	attrs = form.attrs
		// }
		// attrs[specId] = ''
		setForm(_.set({ ...form }, `attrs`, attrs));
	}

	if (noProduct) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such product!
					</Typography>
					<Button className="mt-24" component={Link} variant="outlined" to="/admin/products" color="inherit">
						Go to Products Page
					</Button>
				</div>
			</FuseAnimate>
		);
	}

	if ((!product || (product && routeParams.productId !== product._id)) && routeParams.productId !== 'new') {
		return <FuseLoading />;
	}

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				form && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/admin/products"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Products</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									{/* {form.images.length > 0 && form.featuredImageId ? (
										<img
											className="w-32 sm:w-48 rounded"
											src={_.find(form.images, { id: form.featuredImageId }).url}
											alt={form.name}
										/>
									) : ( */}

									<img
										className="w-32 sm:w-48 rounded"
										src="assets/images/ecommerce/product-image-placeholder.png"
										alt={form.name}
									/>
									{/* )} */}
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.name ? form.name : 'New Product'}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">Product Detail</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-nowrap"
								variant="contained"
								color="secondary"
								onClick={() => {
									let stockarr = { INR: form.stockind, AED: form.stockuae, SAR: form.stockksa };
									let arr = { INR: form.INR, AED: form.AED, SAR: form.SAR };
									let disarr = {
										INR: form.discount_price_INR,
										AED: form.discount_price_AED,
										SAR: form.discount_price_SAR
									};
									form.discountprice = disarr;
									form.price = arr;
									form.stock = stockarr;

									dispatch(saveProduct(form)).then(() => saveSuccess());
								}}
								disabled={!canBeSubmitted()}
							>
								Save
							</Button>
						</FuseAnimate>
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
					<Tab className="h-64" label="Basic Info" />
					<Tab className="h-64" label="Product Images" />
					<Tab className="h-64" label="Pricing" />
					<Tab className="h-64" label="Inventory" />
					<Tab className="h-64" label="Shipping" />
					<Tab className="h-64" label="Extras" />
					<Tab className="h-64" label="Compare Attributes" />
				</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-2xl">
						{tabValue === 0 && (
							<div>
								<TextField
									className="mt-8 mb-16"
									error={form.title === ''}
									required
									label="Title"
									autoFocus
									id="title"
									name="title"
									value={form.title}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16"
									error={form.arabictitle === ''}
									required
									label="Arabic Title"
									autoFocus
									id="arabictitle"
									name="arabictitle"
									value={form.arabictitle}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<FuseChipSelect
									className="mt-8 mb-24"
									required
									value={form.size}
									onChange={value => {
										setInForm('size', value);
										console.log(form.size);
									}}
									placeholder="Select Products Size in ML"
									textFieldProps={{
										label: 'Size Products in ML',
										InputLabelProps: {
											shrink: true
										},
										variant: 'outlined'
									}}
									options={productOptions}
									isMulti
								/>

								{/*<TextField
									className="mt-8 mb-16"
									// error={form.specs === ''}
									label="Weight"
									id="weight"
									name="weight"
									value={form.weight}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>*/}

								<div>
									<FormControl variant="outlined" className="mt-8 mb-16" required fullWidth>
										<InputLabel>Category</InputLabel>
										<Select
											label="Category"
											id="category"
											error={form.category === ''}
											name="category"
											required
											value={form.category}
											onChange={handleChange}
										>
											{categoryOptions.map(item => (
												<MenuItem key={item._id} value={item.title}>
													{item.title}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</div>
								<TextField
									className="mt-8 mb-16"
									error={form.dimensions === ''}
									label="Dimensions"
									autoFocus
									id="dimensions"
									name="dimensions"
									value={form.dimensions}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16"
									id="short"
									name="short"
									required
									onChange={handleChange}
									label="Short Description"
									type="text"
									value={form.short}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16"
									id="shortaed"
									name="shortaed"
									required
									onChange={handleChange}
									label="Short Description Arabic"
									type="text"
									value={form.shortaed}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16"
									id="description"
									name="description"
									required
									error={form.description === ''}
									onChange={handleChange}
									label="English Description"
									type="text"
									value={form.description}
									multiline
									rows={5}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16"
									id="arabicdescription"
									name="arabicdescription"
									error={form.arabicdescription === ''}
									onChange={handleChange}
									label="Arabic Description"
									type="text"
									value={form.arabicdescription}
									multiline
									rows={5}
									required
									variant="outlined"
									fullWidth
								/>

								<FormControl className="mt-8 mb-16" fullWidth>
									<FormControlLabel
										control={
											<Checkbox
												checked={form.nav_include}
												onChange={handleChange}
												name="nav_include"
											/>
										}
										label="Include In Top Nav"
									/>
								</FormControl>
							</div>
						)}
						{tabValue === 1 && (
							<div>
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
									<label
										htmlFor="button-file"
										className={clsx(
											classes.productImageUpload,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg'
										)}
									>
										<input
											accept="image/*"
											className="hidden"
											id="button-file"
											type="file"
											onChange={handleUploadChange}
											multiple
										/>
										<Icon fontSize="large" color="action">
											cloud_upload
										</Icon>
									</label>
									{form.images.map((media, index) => (
										<div
											// onClick={() => setInForm('featuredImageId', media.id)}
											// onKeyDown={() => setInForm('featuredImageId', media.id)}
											role="button"
											tabIndex={0}
											className={clsx(
												classes.productImageItem,
												'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
											)}
											key={`prd_image_${index}`}
										>
											{/* <Icon className={classes.productImageFeaturedStar}>star</Icon> */}
											<Icon
												className={clsx(classes.productImageFeaturedStar, 'text-red text-20')}
												onClick={() => removeImage(index)}
											>
												remove_circle
											</Icon>
											<img className="max-w-none w-auto h-full" src={media} alt="product" />
										</div>
									))}
								</div>
							</div>
						)}
						{tabValue === 2 && (
							<div>
								<TextField
									className="mt-8 mb-16"
									label="Price INR"
									id="INR"
									name="INR"
									error={form.INR === ''}
									value={form.INR >= 0 ? form.INR : 0}
									onChange={handleChange}
									InputProps={{
										startAdornment: <InputAdornment position="start">₹</InputAdornment>
									}}
									type="number"
									variant="outlined"
									autoFocus
									fullWidth
								/>

								<TextField
									className="mt-8 mb-16"
									label="Discount Price INR"
									id="discount_price_INR"
									name="discount_price_INR"
									value={form.discount_price_INR >= 0 ? form.discount_price_INR : 0}
									onChange={handleChange}
									InputProps={{
										startAdornment: <InputAdornment position="start">₹</InputAdornment>
									}}
									type="number"
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16"
									label="Price SAR"
									id="SAR"
									name="SAR"
									error={form.SAR === ''}
									value={form.SAR >= 0 ? form.SAR : 0}
									onChange={handleChange}
									InputProps={{
										startAdornment: <InputAdornment position="start">﷼</InputAdornment>
									}}
									type="number"
									variant="outlined"
									autoFocus
									fullWidth
								/>

								<TextField
									className="mt-8 mb-16"
									label="Discount Price SAR"
									id="discount_price_SAR"
									name="discount_price_SAR"
									value={form.discount_price_SAR >= 0 ? form.discount_price_SAR : 0}
									onChange={handleChange}
									InputProps={{
										startAdornment: <InputAdornment position="start">﷼</InputAdornment>
									}}
									type="number"
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16"
									label="Price AED"
									id="AED"
									name="AED"
									error={form.AED === ''}
									value={form.AED >= 0 ? form.AED : 0}
									onChange={handleChange}
									InputProps={{
										startAdornment: <InputAdornment position="start"> د.إ</InputAdornment>
									}}
									type="number"
									variant="outlined"
									autoFocus
									fullWidth
								/>

								<TextField
									className="mt-8 mb-16"
									label="Discount Price AED"
									id="discount_price_AED"
									name="discount_price_AED"
									value={form.discount_price_AED >= 0 ? form.discount_price_AED : 0}
									onChange={handleChange}
									InputProps={{
										startAdornment: <InputAdornment position="start">د.إ</InputAdornment>
									}}
									type="number"
									variant="outlined"
									fullWidth
								/>
							</div>
						)}
						{tabValue === 3 && (
							<div>
								<TextField
									className="mt-8 mb-16"
									label="stock India"
									id="stockind"
									name="stockind"
									value={form.stockind >= 0 ? form.stockind : 0}
									onChange={handleChange}
									variant="outlined"
									type="number"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16"
									label="stock KSA"
									id="stockksa"
									name="stockksa"
									value={form.stockksa >= 0 ? form.stockksa : 0}
									onChange={handleChange}
									variant="outlined"
									type="number"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16"
									label="stock UAE"
									id="stockuae"
									name="stockuae"
									value={form.stockuae >= 0 ? form.stockuae : 0}
									onChange={handleChange}
									variant="outlined"
									type="number"
									fullWidth
								/>
							</div>
						)}
						{/*tabValue === 4 && (
							<div>
								<div className="flex -mx-4">
									<TextField
										className="mt-8 mb-16 mx-4"
										label="Width"
										autoFocus
										id="width"
										name="width"
										value={form.width}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>

									<TextField
										className="mt-8 mb-16 mx-4"
										label="Height"
										id="height"
										name="height"
										value={form.height}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>

									<TextField
										className="mt-8 mb-16 mx-4"
										label="Depth"
										id="depth"
										name="depth"
										value={form.depth}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
								</div>

								<TextField
									className="mt-8 mb-16"
									label="Weight"
									id="weight"
									name="weight"
									value={form.weight}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>

								{ <TextField
									className="mt-8 mb-16"
									label="Extra Shipping Fee"
									id="extraShippingFee"
									name="extraShippingFee"
									value={form.extraShippingFee}
									onChange={handleChange}
									variant="outlined"
									InputProps={{
										startAdornment: <InputAdornment position="start">$</InputAdornment>
									}}
									fullWidth
								/> }
							</div>
								)*/}
						{tabValue === 5 && (
							<div>
								<FormControl className="mt-8 mb-16" fullWidth>
									<FormControlLabel
										control={
											<Checkbox
												checked={form.topDeals_include}
												onChange={handleChange}
												name="topDeals_include"
											/>
										}
										label="Include In Top Deals"
									/>
								</FormControl>

								<FormControl className="mt-8 mb-16" fullWidth>
									<FormControlLabel
										control={
											<Checkbox
												checked={form.featured_include}
												onChange={handleChange}
												name="featured_include"
											/>
										}
										label="Include In Featured Product"
									/>
								</FormControl>

								<FormControl className="mt-8 mb-16" fullWidth>
									<FormControlLabel
										control={
											<Checkbox
												checked={form.sale_include}
												onChange={handleChange}
												name="sale_include"
											/>
										}
										label="Include In Sale Product"
									/>
								</FormControl>

								<FormControl className="mt-8 mb-16" fullWidth>
									<FormControlLabel
										control={
											<Checkbox
												checked={form.newProduct_include}
												onChange={handleChange}
												name="newProduct_include"
											/>
										}
										label="Include In New Product"
									/>
								</FormControl>
							</div>
						)}
						{tabValue === 6 && (
							<div>
								<FormControl variant="outlined" className="mt-8 mb-16" fullWidth>
									<InputLabel>Attribute types</InputLabel>
									<Select
										label="Attribute Type"
										id="attr_type"
										error={form.attr_type === ''}
										name="attr_type"
										required
										value={form.attr_type && form.attr_type._id}
										onChange={handleChange}
									>
										{specs.map(spec => (
											<MenuItem key={spec._id} value={spec._id}>
												{spec.title}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								{form.attr_type &&
									specs.findIndex(spec => {
										if (typeof form.attr_type == 'object') return spec._id === form.attr_type._id;
										else return spec._id === form.attr_type;
									}) > -1 &&
									specs[
										specs.findIndex(spec => {
											if (typeof form.attr_type == 'object')
												return spec._id === form.attr_type._id;
											else return spec._id === form.attr_type;
										})
									].attrs.map(spec => (
										<TextField
											className="mt-8 mb-16"
											label={spec.value}
											id={spec._id}
											name={spec._id}
											value={form.attrs && form.attrs[spec._id]}
											onChange={e => handleAttrChange(e.target.value, spec._id)}
											variant="outlined"
											fullWidth
										/>
									))}
							</div>
						)}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('app', reducer)(Product);
