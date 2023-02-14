var express = require('express');
const router = express.Router();
const Coupan = require('../../modal/coupanschema');

//----------------------------------------------------post makaj cart api------------------------------------------------------------------------
router.post('/coupon', async (req, res) => {
	Coupan.insertMany(
		{
			code: req.body.code,
			desc: req.body.desc,
			type: req.body.type,
			weightage: req.body.weightage,
			coupanno: req.body.coupanno,
			status: req.body.status
		},
		(err, user) => {
			if (err) {
				console.log(err);
				return res.status(500).send({ err: err });
			}
			return res.status(200).send(user);
		}
	);
});
//get address--------------------------------------------------------------------------------------------------------------
router.get('/coupon', (req, res) => {
	Coupan.find({}, (err, user) => {
		if (err) {
			return res.status(500).send({ err: err });
		}
		return res.status(200).send({ user: user });
	});
});

router.post('/updatecoupon', async (req, res) => {
	const coupon = Coupan.findById(req.body.id);
	console.log(req.body.used);
	if (coupon) {
		coupon.update(
			{ _id: req.body._id },
			{
				code: req.body.code,
				desc: req.body.desc,
				type: req.body.type,
				weightage: req.body.weightage,
				coupanno: req.body.coupanno,
				used: parseInt(req.body.used) + 1,
				status: req.body.status
			},
			(err, user) => {
				if (err) {
					return res.status(500).send({ err: err });
				}
				return res.status(200).send({ user: user });
			}
		);
	}
});

const getCouponById = (req, res) => {
	const coupon = Coupan.findById(req.params.id);

	if (coupon) {
		res.json(coupon);
	} else {
		res.status(404);
		console.log('Coupon not found');
	}
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteCoupon = (req, res) => {
	const coupon = Coupan.findById(req.params.id);

	if (coupon) {
		coupon.remove();
		res.json({ message: 'Coupon removed' });
	} else {
		res.status(404);
		console.log('Coupon not found');
	}
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateCoupon = (req, res) => {
	const { title, desc, total, coupon_type, weightage, active } = req.body;

	const coupon = Coupan.findById(req.params.id);

	if (coupon) {
		coupon.code = title;
		coupon.desc = desc;
		coupon.coupanno = total;
		coupon.type = coupon_type;
		coupon.weightage = weightage;
		coupon.status = active;
		const updatedCoupon = coupon.save();
		res.json(updatedCoupon);
	} else {
		res.status(404);
		console.log('Coupon not found');
	}
};

const getCouponDetails = async (req, res) => {
	const coupon = await Coupan.findOne({ code: req.params.coupon });

	if (coupon) {
		console.log(coupon);

		if (parseInt(coupon.coupanno) > parseInt(coupon.used)) {
			return res.status(200).send(coupon);
		} else {
			return res.status(400).send('no coupan left');
		}
	} else {
		console.log('Coupon not found');
		return res.status(404);
	}
};

router.route('/coupontitle/:coupon').get(getCouponDetails);
router.route('/coupanpost/:id').get(getCouponById).delete(deleteCoupon).put(updateCoupon);
module.exports = router;
