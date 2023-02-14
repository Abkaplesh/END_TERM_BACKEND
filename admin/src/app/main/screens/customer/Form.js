import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetBrand, saveBrand, newBrand, getBrand } from '../store/brand/brandSlice';
import reducer from '../store';
import Card from '@material-ui/core/Card';
import Header from 'app/fuse-layouts/shared-components/Header';
import { useAlert } from 'react-alert'



function UserForm(props) {
	
	const alert = useAlert()
	const dispatch = useDispatch();
	const brand = useSelector(({ app }) => app.brand);
	const pageLayout = useRef(null);
	const [noBrand, setNoBrand] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateBrandState() {
			const { brandId } = routeParams;

			if (brandId === 'add') {
				dispatch(newBrand());
			} else {
				dispatch(getBrand(routeParams)).then(action => {
					if (!action.payload) {
						setNoBrand(true);
					}
				});
			}
		}

		updateBrandState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((brand && !form) || (brand && form && brand._id !== form._id)) {
			setForm(brand);
		}
	}, [form, brand, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetBrand());
			setNoBrand(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.title.length > 0 && !_.isEqual(brand, form);
	}

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/brands`);
	}

    if (noBrand) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Customers!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!brand || (brand && routeParams.brandId !== brand._id)) && routeParams.brandId !== 'add') {
		return <FuseLoading />;
	}

	
	
	return form && 
			<FusePageSimple
				classes={{
					content: 'min-h-full',
					header: 'min-h-72 h-72'
				}}
				header={<Header pageLayout={pageLayout} headText="ADD BRAND" backLink="/admin/brands" icon="branding_watermark" />}
				content={
					<Card className="mx-16 my-16">
						<div className="p-16 sm:p-24 max-w-2xl">
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
								error={form.slug === ''}
								required
								label="Slug"
								id="slug"
								name="slug"
								value={form.slug}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									color="secondary"
									disabled={!canBeSubmitted()}
									onClick={() => dispatch(saveBrand(form)).then( () => saveSuccess())}
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
}

export default withReducer('app', reducer)(UserForm);
