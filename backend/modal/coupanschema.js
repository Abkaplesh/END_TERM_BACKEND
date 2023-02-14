const mongoose = require('mongoose');

const coupan = mongoose.Schema({
	code: {
		type: String
	},
	desc: {
		type: String
	},
	type: {
		type: String
	},
	weightage: {
		type: String
	},
	coupanno: {
		type: String
	},
	status: {
		type: String
	},
	used: {
		type: Number,
		default: 0
	}
});
const model = mongoose.model('Coupan', coupan);
module.exports = model;
