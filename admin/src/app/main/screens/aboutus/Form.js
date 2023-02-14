import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import { orange } from '@material-ui/core/colors';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetBanner, saveBanner, newBanner, getBanner } from '../store/banner/bannerSlice';
import reducer from '../store';
import Card from '@material-ui/core/Card';
import Header from 'app/fuse-layouts/shared-components/Header';
import { useAlert } from 'react-alert';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import { getAboutus, newAboutus, resetAboutus, saveAboutus } from '../store/aboutus/bannerSlice';
import { Label } from '@material-ui/icons';

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

function BannerForm(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	let banner = useSelector(({ app }) => app.aboutus);
	const pageLayout = useRef(null);
	const [noBanner, setNoBanner] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();
	const classes = useStyles(props);

	useDeepCompareEffect(() => {
		function updateBannerState() {
			const { id } = routeParams;

			if (id === 'add') {
				dispatch(newAboutus());
			} else {
				dispatch(getAboutus(routeParams)).then(action => {
					if (action.payload.length <= 0) {
						setNoBanner(true);
					}
					banner = action.payload[0];
				});
			}
		}

		updateBannerState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((banner && !form) || (banner && form && banner._id !== form._id)) {
			setForm(banner);
		}
	}, [form, banner, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetAboutus());
			setNoBanner(false);
		};
	}, [dispatch]);

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/aboutus`);
	}

	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `img1`, `data:${file.type};base64,${btoa(reader.result)}`));
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	function handleUploadChange2(e) {
		const file = e.target.files[0];
		console.log(form);

		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `img2`, `data:${file.type};base64,${btoa(reader.result)}`));
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	function handleUploadChange3(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `img3`, `data:${file.type};base64,${btoa(reader.result)}`));
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	function handleUploadChange4(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `img4`, `data:${file.type};base64,${btoa(reader.result)}`));
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	if (noBanner) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Aboutus!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!banner || (banner && routeParams.id !== banner._id)) && routeParams.id !== 'add') {
		return <FuseLoading />;
	}

	return (
		form && (
			<FusePageSimple
				classes={{
					content: 'min-h-full',
					header: 'min-h-72 h-72'
				}}
				header={
					<Header
						pageLayout={pageLayout}
						headText="ADD BANNER"
						backLink="/admin/aboutus"
						icon="view_carousel"
					/>
				}
				content={
					<Card className="mx-16 my-16">
						<div className="p-16 sm:p-24 max-w-2xl">
							<label >
								Heading 1
							</label>
							<TextField
								className="mt-8 mb-16"
								error={form.head === ''}
								required
								label="ONLINE SHOP SERVICES"
								autoFocus
								id="head"
								name="head"
								value={form.head}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<label >
								Heading 1 Arabic
							</label>
							<TextField
								className="mt-8 mb-16"
								error={form.headaed === ''}
								required
								label="ONLINE SHOP SERVICES Arabic"
								autoFocus
								id="headaed"
								name="headaed"
								value={form.headaed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
<label for="title">
								Title 1
							</label>
							<TextField
								className="mt-8 mb-16"
								label="Clive Christian is committed to offering exceptional service. Ensure to sign up to our newsletter to received update on new product launches, exclusive news, perfume advice and inspiration."
								id="title"
								name="title"
								value={form.title}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>

<label >
								Title Arabic 1
							</label>

							<TextField
								className="mt-8 mb-16"
								label="Clive Christian is committed to offering exceptional service. Ensure to sign up to our newsletter to received update on new product launches, exclusive news, perfume advice and inspiration. Arbic"
								id="titleaed"
								name="titleaed"
								value={form.titleaed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<label >
								Heading 2
							</label>
							<TextField
								className="mt-8 mb-16"
								label="BESPOKE PERFUME CONSULTATION FROM YOUR HOME"
								id="head1"
								name="head1"
								value={form.head1}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<label >
								Heading Arabic 2
							</label>
							<TextField
								className="mt-8 mb-16"
								label="BESPOKE PERFUME CONSULTATION FROM YOUR HOME Arabic"
								id="head1aed"
								name="head1aed"
								value={form.head1aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<label >
								Info 1
							</label>
							<TextField
								className="mt-8 mb-16"
								label="Our dedicated telephone consultation service will help you find your next perfect perfume from your home, with the help of one of our perfume experts.
								"
								id="info1"
								name="info1"
								value={form.info1}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<label >
								Info Arabic 1
							</label>
							<TextField
								className="mt-8 mb-16"
								label="Our dedicated telephone consultation service will help you find your next perfect perfume from your home, with the help of one of our perfume experts."
								id="info1aed"
								name="info1aed"
								value={form.info1aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>

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
										required
										className="hidden"
										id="button-file"
										type="file"
										onChange={handleUploadChange}
									/>
									<Icon fontSize="large" color="action">
										cloud_upload
									</Icon>
								</label>
								{form.img1 && (
									<div
										// onClick={() => setInForm('featuredImageId', media.id)}
										// onKeyDown={() => setInForm('featuredImageId', media.id)}
										role="button"
										tabIndex={0}
										className={clsx(
											classes.productImageItem,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
										)}
									>
										{/* <Icon className={classes.productImageFeaturedStar}>star</Icon> */}
										<img className="max-w-none w-auto h-full" src={form.img1} alt="product" />
									</div>
								)}
							</div>
							<label>
								Heading 2
							</label>
							<TextField
								className="mt-8 mb-16"
								label="COMPLIMENTARY PERFUME SAMPLE"
								id="head2"
								name="head2"
								value={form.head2}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<label>
								Heading 2 arabic
							</label>
							<TextField
								className="mt-8 mb-16"
								label="COMPLIMENTARY PERFUME SAMPLE Arabic 3"
								id="head2aed"
								name="head2aed"
								value={form.head2aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<label>
								Title 2
							</label>
							<TextField
								className="mt-8 mb-16"
								label="Enjoy complimentary samples with every purchase. Currently we include one sample in each online order, able for each customer to select themselves to discover the extraordinary world of Clive Christian Perfume."
								id="title2"
								name="title2"
								value={form.title2}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<label>
								Title arabic 1
							</label>
							<TextField
								className="mt-8 mb-16"
								label="Enjoy complimentary samples with every purchase. Currently we include one sample in each online order, able for each customer to select themselves to discover the extraordinary world of Clive Christian Perfume.Arabic"
								id="title2aed"
								name="title2aed"
								value={form.title2aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>

							<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
								<label
									htmlFor="button-file1"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/*"
										required
										className="hidden"
										id="button-file1"
										type="file"
										onChange={handleUploadChange2}
									/>
									<Icon fontSize="large" color="action">
										cloud_upload
									</Icon>
								</label>
								{form.img2 && (
									<div
										// onClick={() => setInForm('featuredImageId', media.id)}
										// onKeyDown={() => setInForm('featuredImageId', media.id)}
										role="button"
										tabIndex={0}
										className={clsx(
											classes.productImageItem,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
										)}
									>
										{/* <Icon className={classes.productImageFeaturedStar}>star</Icon> */}
										<img className="max-w-none w-auto h-full" src={form.img2} alt="product" />
									</div>
								)}
							</div>
							

							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									color="secondary"
									onClick={() => {
										form.data = {
											head: { INR: form.head, AED: form.headaed },
											title: { INR: form.title, AED: form.titleaed },
											head1: { INR: form.head1, AED: form.head1aed },
											info1: { INR: form.info1, AED: form.info1aed },
											head2: { INR: form.head2, AED: form.head2aed },
											title2: { INR: form.title2, AED: form.title2aed },
											img1: form.img1,
											img2: form.img2,
										};

										dispatch(saveAboutus(form.data)).then(() => saveSuccess());
									}}
								>
									Save
								</Button>
							</FuseAnimate>
						</div>
					</Card>
				}
				ref={pageLayout}
				innerScroll
			/>
		)
	);
}

export default withReducer('app', reducer)(BannerForm);
