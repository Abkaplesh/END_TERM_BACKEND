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
import { gettermsandcond,newtermsandcond,resettermsandcond,savetermsandcond } from '../store/termsandcond/bannerSlice';
import { TextareaAutosize } from '@material-ui/core';



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
	const banner = useSelector(({ app }) => app.termsandcond);
	const pageLayout = useRef(null);
	const [noBanner, setNoBanner] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();
	const classes = useStyles(props);

	useDeepCompareEffect(() => {
		function updateBannerState() {
			const { id } = routeParams;

			if (id === 'add') {
				dispatch(newtermsandcond());
			} else {
				dispatch(gettermsandcond(routeParams)).then(action => {
					if (!action.payload) {
						setNoBanner(true);
					}
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
			dispatch(resettermsandcond());
			setNoBanner(false);
		};
	}, [dispatch]);

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/termandconditions`);
	}

	
	if (noBanner) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such termandconditions!
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
						headText="ADD TERMSANDCONDITIONS"
						backLink="/admin/termandconditions"
						icon="view_carousel"
					/>
				}
				content={
					<Card className="mx-16 my-16">
						<div className="p-16 sm:p-24 max-w-2xl">
							<TextField
								className="mt-8 mb-16"
								error={form.html === ''}
								required
								label="Html"
								autoFocus
								id="html"
								name="html"
								value={form.html}
								onChange={handleChange}
								variant="outlined"
								fullWidth
								multiline
									rows={5}
							/>
							

							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									color="secondary"
									onClick={() => dispatch(savetermsandcond(form)).then(() => saveSuccess())}
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
