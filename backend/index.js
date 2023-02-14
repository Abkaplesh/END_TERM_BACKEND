const express = require('express');
var cors = require('cors');
var http = require('http');
var path = require('path');

const passport = require('passport');
const router = express.Router({ mergeParams: true });
require('./dbconnection/db');

const app = express();
app.use(express.urlencoded({ limit: '50mb' }));
let server = http.Server(app);
app.use(passport.initialize());
require('./utils/passport')(passport);

app.use(express.json({ limit: '50mb' }));

let makkajproduct = require('./router/routes/productrouter');
let cart = require('./router/routes/cartrouter');
let user = require('./router/routes/user');
let address = require('./router/routes/address');
let orders = require('./router/routes/orderrouter');
let categort = require('./router/routes/categoryrouter');
let banner = require('./router/routes/banner');
let coupon = require('./router/routes/coupanrouter');
let wishlist = require('./router/routes/wishlistrouter');
let adminlogin = require('./router/routes/adminloginrouter');
let review = require('./router/routes/review');
let tax=require('./router/routes/taxrouter');
let aboutus=require('./router/routes/aboutus');
let home=require('./router/routes/home');
let termsandcond=require('./router/routes/termsandcondition');
let privacy=require('./router/routes/privacyrouter');
let returns=require('./router/routes/return');



//let medicinecategory = require('./router/medicines/categoryrouter');
app.use(cors());
app.use('/api', makkajproduct);
app.use('/api', cart);
app.use('/api', user);
app.use('/api', address);
app.use('/api', orders);
app.use('/api', categort);
app.use('/api', banner);
app.use('/api', coupon);
app.use('/api', wishlist);
app.use('/api', adminlogin);
app.use('/api', review);
app.use('/api', tax);
app.use('/api',aboutus);
app.use('/api',home);
app.use('/api',termsandcond);
app.use('/api',privacy);
app.use('/api',returns);



__dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));
	app.use(express.static(path.join(__dirname, '/admin/build')));

	app.get('/admin', (req, res) => res.sendFile(path.resolve(__dirname, 'adminend', 'build', 'index.html')));
	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
} else {
	app.get('/', (req, res) => {
		res.send('API is running....');
	});
}

//-----------------------------------------------------------port--------------------------------------------------------------------
const port = process.env.PORT || 5000;

server.listen(port, (req, res) => {
	console.log('server start at ' + port);
});
