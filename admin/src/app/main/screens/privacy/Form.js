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
import reducer from '../store';
import Card from '@material-ui/core/Card';
import Header from 'app/fuse-layouts/shared-components/Header';
import { useAlert } from 'react-alert';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import { Label } from '@material-ui/icons';
import { getPrivacy, newPrivacy, resetPrivacy, savePrivacy } from '../store/privacy/bannerSlice';

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
	let banner = useSelector(({ app }) => app.privacy);
	const pageLayout = useRef(null);
	const [noBanner, setNoBanner] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();
	const classes = useStyles(props);

	useDeepCompareEffect(() => {
		function updateBannerState() {
			const { id } = routeParams;

			if (id === 'add') {
				dispatch(newPrivacy());
			} else {
				dispatch(getPrivacy(routeParams)).then(action => {
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
			dispatch(resetPrivacy());
			setNoBanner(false);
		};
	}, [dispatch]);

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/privacy`);
	}



	if (noBanner) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Privacy Policy!
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
						backLink="/admin/privacy"
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

							
							<label>
								Heading 3
							</label>
							<TextField
								className="mt-8 mb-16"
								label="ICONIC PRESENTATION BOX"
								id="head3"
								name="head3"
								value={form.head3}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<label>
								Heading Arabic 1
							</label>
							<TextField
								className="mt-8 mb-16"
								label="ICONIC PRESENTATION BOX Arabic 4"
								id="head3aed"
								name="head3aed"
								value={form.head3aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
<label>
								Title 3
							</label>
							<TextField
								className="mt-8 mb-16"
								label="Your online order is carefully presented in the iconic Clive Christian gold foiled presentation case, including handcrafted certificates or booklets inside, carefully created by up to 13 different craftsmen.
								."
								id="title3"
								name="title3"
								value={form.title3}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<label>
								Title Arabic 1
							</label>
							<TextField
								className="mt-8 mb-16"
								label="Your online order is carefully presented in the iconic Clive Christian gold foiled presentation case, including handcrafted certificates or booklets inside, carefully created by up to 13 different craftsmen."
								id="title3aed"
								name="title3aed"
								value={form.title3aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>

							
							<label>
								Heading 4
							</label>
							<TextField
								className="mt-8 mb-16"
								label="SHIPPING TERMS"
								id="head4"
								name="head4"
								value={form.head4}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<label>
								Heading arabic 4
							</label>
							<TextField
								className="mt-8 mb-16"
								label="SHIPPING TERMS Arabic 5"
								id="head4aed"
								name="head4aed"
								value={form.head4aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
<label>
								Title 4
							</label>
							<TextField
								className="mt-8 mb-16"
								label="Clive Christian Perfume offers complimentary UPS. Our Next Day Delivery (air) service rate is $50. Orders must be placed before 2pm for delivery before 3pm for delivery before 3pm nest day. Delivery is from Monday to Friday, excluding bank holidays."
								id="title4"
								name="title4"
								value={form.title4}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
<label>
								Title 4 Arabic
							</label>
							<TextField
								className="mt-8 mb-16"
								label="Clive Christian Perfume offers complimentary UPS standard ground shipping on US orders . Arabic 4"
								id="title4aed"
								name="title4aed"
								value={form.title4aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>

							
							

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
											head3: { INR: form.head3, AED: form.head3aed },
											title3: { INR: form.title3, AED: form.title3aed },
											head4: { INR: form.head4, AED: form.head4aed },
											title4: { INR: form.title4, AED: form.title4aed },
											
										};

										dispatch(savePrivacy(form.data)).then(() => saveSuccess());
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
