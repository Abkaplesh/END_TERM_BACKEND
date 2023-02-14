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
import { getHome, newHome, resetHome, saveHome } from '../store/home/bannerSlice';

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
	const banner = useSelector(({ app }) => app.home);
	const pageLayout = useRef(null);
	const [noBanner, setNoBanner] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();
	const classes = useStyles(props);

	useDeepCompareEffect(() => {
		function updateBannerState() {
			const { id } = routeParams;

			if (id === 'add') {
				dispatch(newHome());
			} else {
				dispatch(getHome(routeParams)).then(action => {
					if (!action.payload) {
						setNoBanner(true);
					}
				});
			}
		}

		updateBannerState();
	}, [dispatch, routeParams]);

	function canBeSubmitted() {
		return (
			form.title != undefined &&
			form.titleaed != undefined &&
			form.quote != undefined &&
			form.quoteaed != undefined &&
			form.quotetext != undefined &&
			form.quotetextaed != undefined &&
			form.items1 != undefined &&
			form.items1aed != undefined &&
			form.items2 != undefined &&
			form.items2aed != undefined &&
			form.items3 != undefined &&
			form.items3aed != undefined &&
			form.items4 != undefined &&
			form.items4aed != undefined &&
			form.items5 != undefined &&
			form.items5aed != undefined &&
			form.imagehead != undefined &&
			form.imageheadaed != undefined &&
			form.imagehead1 != undefined &&
			form.imagehead1aed != undefined &&
			form.image3title != undefined &&
			form.image3titleaed != undefined &&
			form.head4 != undefined &&
			form.head4aed != undefined &&
			form.testimonialtitle != undefined &&
			form.testimonialtitleaed != undefined &&
			form.testimonialhead != undefined &&
			form.testimonialheadaed != undefined &&
			form.testimonialname != undefined &&
			form.testimonialnameaed != undefined &&
			form.testimonialtitle1 != undefined &&
			form.testimonialtitle1aed != undefined &&
			form.testimonialhead1 != undefined &&
			form.testimonialhead1aed != undefined &&
			form.testimonialname1 != undefined &&
			form.testimonialname1aed != undefined
		);
	}

	useEffect(() => {
		if ((banner && !form) || (banner && form && banner._id !== form._id)) {
			setForm(banner);
		}
	}, [form, banner, setForm]);
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
	useEffect(() => {
		return () => {
			dispatch(resetHome());
			setNoBanner(false);
		};
	}, [dispatch]);

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/home`);
	}

	if (noBanner) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Home!
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
						headText="ADD HOMESCREEN"
						backLink="/admin/home"
						icon="view_carousel"
					/>
				}
				content={
					<Card className="mx-16 my-16">
						<div className="p-16 sm:p-24 max-w-2xl">
							<lable>Heading 1</lable>
							<TextField
								className="mt-8 mb-16"
								error={form.title === ''}
								required
								label="We are Makkaj"
								autoFocus
								id="title"
								name="title"
								value={form.title}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Heading 1 Arabic</lable>
							<TextField
								className="mt-8 mb-16"
								error={form.titleaed === ''}
								required
								label="We are Makkaj"
								autoFocus
								id="titleaed"
								name="titleaed"
								value={form.titleaed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Quote 1</lable>

							<TextField
								className="mt-8 mb-16"
								label="Inspired by Nature, Crafted by Science"
								id="quote"
								name="quote"
								value={form.quote}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Quote 1 Arabic</lable>

							<TextField
								className="mt-8 mb-16"
								label="Inspired by Nature, Crafted by Science Arabic"
								id="quoteaed"
								name="quoteaed"
								value={form.quoteaed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Quotetext 1</lable>
							<TextField
								className="mt-8 mb-16"
								label=" Our pursuit to bring our finest Makkaj fragrances to the world is
								insatiable. From our main showroom in Jeddah Bab Shareef, we are
								expanding our reach to five more showrooms in Saudi Arabia in 2017"
								id="quotetext"
								name="quotetext"
								value={form.quotetext}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Quotetext 1 Arabic</lable>

							<TextField
								className="mt-8 mb-16"
								label=" Our pursuit to bring our finest Makkaj fragrances to the world is
								insatiable. From our main showroom in Jeddah Bab Shareef, we are
								expanding our reach to five more showrooms in Saudi Arabia in 2017 Arabic"
								id="quotetextaed"
								name="quotetextaed"
								value={form.quotetextaed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Item 1 </lable>

							<TextField
								className="mt-8 mb-16"
								label="Non-toxic"
								id="items1"
								name="items1"
								value={form.items1}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Item 1 Arabic</lable>

							<TextField
								className="mt-8 mb-16"
								label="Non-toxic Arabic"
								id="items1aed"
								name="items1aed"
								value={form.items1aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Item 2</lable>

							<TextField
								className="mt-8 mb-16"
								label="ISO-GMP "
								id="items2"
								name="items2"
								value={form.items2}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Item 2 Arabic</lable>

							<TextField
								className="mt-8 mb-16"
								label="ISO-GMP Arabic"
								id="items2aed"
								name="items2aed"
								value={form.items2aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Item 3</lable>

							<TextField
								className="mt-8 mb-16"
								error={form.items3 === ''}
								required
								label="Sustainable"
								autoFocus
								id="items3"
								name="items3"
								value={form.items3}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Item 3 Arabic</lable>

							<TextField
								className="mt-8 mb-16"
								error={form.items3aed === ''}
								required
								label="Sustainable arabic"
								autoFocus
								id="items3aed"
								name="items3aed"
								value={form.items3aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Item 4 </lable>

							<TextField
								className="mt-8 mb-16"
								label="Allergen-free "
								id="items4"
								name="items4"
								value={form.items4}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Item 4 Arabic</lable>

							<TextField
								className="mt-8 mb-16"
								label="Allergen-free Arabic"
								id="items4aed"
								name="items4aed"
								value={form.items4aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Item 5</lable>

							<TextField
								className="mt-8 mb-16"
								label="Sharia Compliance"
								id="items5"
								name="items5"
								value={form.items5}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Item 5 Arabic</lable>

							<TextField
								className="mt-8 mb-16"
								label="Sharia Compliance Arabic"
								id="items5aed"
								name="items5aed"
								value={form.items5aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>

							<lable>Imagehead</lable>
							<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
								<label
									htmlFor="button-file2"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/*"
										required
										className="hidden"
										id="button-file2"
										type="file"
										onChange={handleUploadChange3}
									/>
									<Icon fontSize="large" color="action">
										cloud_upload
									</Icon>
								</label>
								{form.img3 && (
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
										<img className="max-w-none w-auto h-full" src={form.img3} alt="product" />
									</div>
								)}
							</div>
							<TextField
								className="mt-8 mb-16"
								label="MAKKAJ COLLECTIONS "
								id="imagehead"
								name="imagehead"
								value={form.imagehead}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Imagehead Arabic</lable>

							<TextField
								className="mt-8 mb-16"
								label="MAKKAJ COLLECTIONS Arabic"
								id="imageheadaed"
								name="imageheadaed"
								value={form.imageheadaed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>

							<lable>Imagehead 1</lable>

							<TextField
								className="mt-8 mb-16"
								label="Imagehead 1"
								id="imagehead1"
								name="imagehead1"
								value={form.imagehead1}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Imagehead 1 Arabic</lable>

							<TextField
								className="mt-8 mb-16"
								label="Imagehead 1 Arabic"
								id="imagehead1aed"
								name="imagehead1aed"
								value={form.imagehead1aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Imagetitle 1</lable>

							<TextField
								className="mt-8 mb-16"
								label="Image title"
								id="image3title"
								name="image3title"
								value={form.image3title}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Imagetitle 1 arabic</lable>

							<TextField
								className="mt-8 mb-16"
								label="Image title"
								id="image3titleaed"
								name="image3titleaed"
								value={form.image3titleaed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Heading 4</lable>

							<TextField
								className="mt-8 mb-16"
								error={form.head4 === ''}
								required
								label="Heading 4"
								autoFocus
								id="head4"
								name="head4"
								value={form.head4}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Heading 4 Arabic</lable>

							<TextField
								className="mt-8 mb-16"
								error={form.head4aed === ''}
								required
								label="Heading 4 Arabic"
								autoFocus
								id="head4aed"
								name="head4aed"
								value={form.head4aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>

							<lable>Testimonialtitle 1</lable>

							<TextField
								className="mt-8 mb-16"
								label="Testimonial Title"
								id="testimonialtitle"
								name="testimonialtitle"
								value={form.testimonialtitle}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Testimonialtitle arabic 1</lable>

							<TextField
								className="mt-8 mb-16"
								label="Testimonial Title Arabic"
								id="testimonialtitleaed"
								name="testimonialtitleaed"
								value={form.testimonialtitleaed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Testimonialhead 1</lable>

							<TextField
								className="mt-8 mb-16"
								label="Testimonial Head"
								id="testimonialhead"
								name="testimonialhead"
								value={form.testimonialhead}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Testimonialhead arabic 1</lable>

							<TextField
								className="mt-8 mb-16"
								label="Testimonial Head Arabic"
								id="testimonialheadaed"
								name="testimonialheadaed"
								value={form.testimonialheadaed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Testimonialname 1</lable>

							<TextField
								className="mt-8 mb-16"
								label="Testimonial Name"
								id="testimonialname"
								name="testimonialname"
								value={form.testimonialname}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Testimonialname arabic 1</lable>

							<TextField
								className="mt-8 mb-16"
								label="Testimonial Name Arabic"
								id="testimonialnameaed"
								name="testimonialnameaed"
								value={form.testimonialnameaed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Testimonialtitle 2</lable>

							<TextField
								className="mt-8 mb-16"
								label="Testimonial title 1"
								id="testimonialtitle1"
								name="testimonialtitle1"
								value={form.testimonialtitle1}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Testimonialname arabic 2</lable>

							<TextField
								className="mt-8 mb-16"
								label="Testimonial title 1 Arabic"
								id="testimonialtitle1aed"
								name="testimonialtitle1aed"
								value={form.testimonialtitle1aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Testimonialhead 2</lable>

							<TextField
								className="mt-8 mb-16"
								label="testimonial head 1"
								id="testimonialhead1"
								name="testimonialhead1"
								value={form.testimonialhead1}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Testimonialhead arabic 2</lable>

							<TextField
								className="mt-8 mb-16"
								label="testimonial head 1 arabic"
								id="testimonialhead1aed"
								name="testimonialhead1aed"
								value={form.testimonialhead1aed}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Testimonialname 2</lable>

							<TextField
								className="mt-8 mb-16"
								label="Testimonial Name"
								id="testimonialname1"
								name="testimonialname1"
								value={form.testimonialname1}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<lable>Testimonialname arabic 2</lable>

							<TextField
								className="mt-8 mb-16"
								label="Testimonial Name Arabic"
								id="testimonialname1aed"
								name="testimonialname1aed"
								value={form.testimonialname1aed}
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
											title: { INR: form.title, AED: form.titleaed },
											quote: { INR: form.quote, AED: form.quoteaed },
											quotetext: { INR: form.quotetext, AED: form.quotetextaed },
											items1: { INR: form.items1, AED: form.items1aed },
											items2: { INR: form.items2, AED: form.items2aed },
											items3: { INR: form.items3, AED: form.items3aed },
											items4: { INR: form.items4, AED: form.items4aed },
											items5: { INR: form.items5, AED: form.items5aed },
											imagehead: { INR: form.imagehead, AED: form.imageheadaed },
img3:form.img3,
											imagehead1: { INR: form.imagehead1, AED: form.imagehead1aed },
											image3title: { INR: form.image3title, AED: form.image3titleaed },
											head4: { INR: form.head4, AED: form.head4aed },
											testimonialtitle: {
												INR: form.testimonialtitle,
												AED: form.testimonialtitleaed
											},
											testimonialhead: {
												INR: form.testimonialhead,
												AED: form.testimonialheadaed
											},
											testimonialname: {
												INR: form.testimonialname,
												AED: form.testimonialnameaed
											},
											testimonialtitle1: {
												INR: form.testimonialtitle1,
												AED: form.testimonialtitle1aed
											},
											testimonialhead1: {
												INR: form.testimonialhead1,
												AED: form.testimonialhead1aed
											},
											testimonialname1: {
												INR: form.testimonialname1,
												AED: form.testimonialname1aed
											}
										};
										dispatch(saveHome(form.data)).then(() => saveSuccess());
									}}
									disabled={!canBeSubmitted()}
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
