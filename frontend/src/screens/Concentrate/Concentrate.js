import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import "./Concentrate.css";

export const Concentrate = () => {
    return (
         <div>
             <Breadcrumbs aria-label="breadcrumb">
  <Link color="inherit" to="/">
    Home
  </Link>
  <Link color="inherit" to="/products">
    Products
  </Link>
  <Typography color="textPrimary">Concentrate</Typography>
</Breadcrumbs>
        </div>
    )
}
