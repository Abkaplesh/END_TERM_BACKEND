const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,

            ref: "User",
        },
        
        orderItems:{
            type:Array
        },
        shippingAddress: {
            firstname: {
                type: String
            },
            lastname: {
                type: String
            },
            lat:{
                type:String
            },
            long:{
                type:String
            },
            address: {
                type: String
            },
            appartment: {
                type: String
            },
            city: {
                type: String
            },
            country: {
                type: String
            },
            state: {
                type: String
            },
            pin: {
                type: String
            },
            phone: {
                type: String
            },
            email: {
                type: String
            },
        },
        paymentMethod: {
            type: String,

        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        taxPrice: {
            type: Number,

            default: 0.0,
        },
        shippingPrice: {
            type: Number,

            default: 0.0,
        },
        totalPrice: {
            type: Number,

            default: 0.0,
        },
        deliveryInstruction: {
            type: String,
        },
        transactionId: {
            type: String,

        },

        isPaid: {
            type: Boolean,

            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,

        },
        isCancelled: {
            type: Boolean,

            default: false,
        },
        cancelReason: {
            type: String,
            default: "",
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

orderSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
