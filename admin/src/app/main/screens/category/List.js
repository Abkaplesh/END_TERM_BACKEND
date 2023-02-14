import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import React, { useEffect, useRef, useState } from 'react';
import withReducer from 'app/store/withReducer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import reducer from '../store';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Header from 'app/fuse-layouts/shared-components/Header';
import DeleteIcon from '@material-ui/icons/Delete';
import { getCategories, selectCategories, setCategoriesSearchText } from '../store/category/categoriesSlice';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
function Category(props) {
	const dispatch = useDispatch();
	const categories = useSelector(selectCategories);
	const [data, setData] = useState(categories);
	const searchText = useSelector(({ app }) => app.categories.searchText);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(getCategories()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			const res = axios.get(`http://localhost:5000/api/procategory`).then(resp =>
				setData(
					resp.data.filter(item => {
						let { title } = item;
						return [title].join(',').toLowerCase().includes(searchText.toLowerCase());
					})
				)
			);
			setPage(0);
		} else {
			const res = axios.get(`http://localhost:5000/api/procategory`).then(resp => setData(resp.data));
		}
	}, [categories, searchText]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	function handleClick(item) {
		props.history.push(`/admin/category/${item._id}`);
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const columns = [
		{ id: 'title', label: 'TITLE', width: 200 },
		{ id: 'image', label: 'IMAGE', width: 200 },
		{ id: 'bannerImg', label: 'BANNERIMAGE', width: 200 },

		{ id: 'des', label: 'DESCRIPTION', width: 200 },
		{label:"Action",width:50}
	];

	function changeSearch(ev) {
		dispatch(setCategoriesSearchText(ev));
	}

	const useStyles = makeStyles({
		root: {
			width: '100%'
		},
		container: {
			maxHeight: 440
		}
	});

	if (loading) {
		return <FuseLoading />;
	}

	return (
		<FusePageSimple
			classes={{
				// content: 'overflow-hidden',
				header: 'min-h-72 h-72'
			}}
			header={
				<Header
					pageLayout={pageLayout}
					icon="category"
					headText="ALL CATEGORIES"
					addLink="/admin/category/add"
					handleSearch={ev => changeSearch(ev)}
				/>
			}
			content={
				data.length === 0 ? (
					<FuseAnimate delay={100}>
						<div className="flex flex-1 items-center justify-center h-full">
							<Typography color="textSecondary" variant="h5">
								There are no categories!
							</Typography>
						</div>
					</FuseAnimate>
				) : (
					<Card className="mx-16 my-16">
						<FuseScrollbars className="flex-grow overflow-x-auto">
							<TableContainer className={useStyles.container}>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											{columns.map(column => (
												<TableCell
													key={column.id}
													align={column.align}
													style={{ minWidth: column.width }}
												>
													{column.label}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
											return (
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													className="h-64 cursor-pointer"
													key={row._id}
													onClick={event => handleClick(row)}
												>
													{columns.map(column => {
														const value = row[column.id];
														if (column.id === 'parent') {
															return (
																<TableCell
																	key={column.id + row._id}
																	align={column.align}
																>
																	{value.title}
																</TableCell>
															);
														}
														if (column.id === 'image'||column.id==='bannerImg') {
															return (
																<TableCell key={column.id} align={column.align}>
																	<img src={value} height="100px" width="100px" />
																</TableCell>
															);
														}
														return (
															<TableCell key={column.id + row._id} align={column.align}>
																
																{typeof value == 'boolean' ? (
																	value ? (
																		<Icon className="text-green text-20">
																			check_circle
																		</Icon>
																	) : (
																		<Icon className="text-red text-20">
																			remove_circle
																		</Icon>
																	)
																) : (
																	value
																)}
															</TableCell>
														);
													})}
													<TableCell>
													<IconButton aria-label="delete" onClick={()=>{
														axios.post(`http://localhost:5000/api/procategory/${row._id}`);
													}} >
																	<DeleteIcon  />
																</IconButton>
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
						</FuseScrollbars>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component="div"
							className="flex-shrink-0 border-t-1"
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</Card>
				)
			}
			ref={pageLayout}
			// innerScroll
		/>
	);
}

export default withReducer('app', reducer)(Category);
