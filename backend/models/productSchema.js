import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },



    completeAddress: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    landmark: {
        type: String
    },




    orderId: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    paymentMode: {
        type: String,
        enum: ['cod', 'prepaid'],
        required: true
    },


    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['accessories', 'fashion and clothing', 'accessories', 'electronics', 'fmcg', 'footwear', 'toys', 'sports equipment', 'others', 'wellness', 'medicines']
    },
    quantity: {
        type: Number,
        required: true
    },
    orderValue: {
        type: Number,
        required: true
    },
    hsn: {
        type: String,
        required: true
    },





    physicalWeight: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    breadth: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },


    courierservices: {
        type: String,
        enum: ['xpressbees', 'dtdc', 'delhivery', 'indiaPost', 'bluedart']
    },

    amount: {
        type: Number,
        required: true
    },
}, 
{
    timestamps: true
});


const productModel = mongoose.model("productDetails", productSchema);

export default productModel;