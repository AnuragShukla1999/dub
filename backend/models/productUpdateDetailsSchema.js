import mongoose from "mongoose";


const productUpdateDetailsSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    mobileNo: {
        type: Number
    },
    email: {
        type: String
    },



    completeAddress: {
        type: String
    },
    pincode: {
        type: Number
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
        type: String
    },
    orderDate: {
        type: Date
    },
    paymentMode: {
        type: String,
        enum: ['cod', 'prepaid']
    },


    productName: {
        type: String
    },
    category: {
        type: String,
        enum: ['accessories', 'fashion and clothing', 'accessories', 'electronics', 'fmcg', 'footwear', 'toys', 'sports equipment', 'others', 'wellness', 'medicines']
    },
    quantity: {
        type: Number
    },
    orderValue: {
        type: Number
    },
    hsn: {
        type: String
    },





    physicalWeight: {
        type: String
    },
    length: {
        type: String
    },
    breadth: {
        type: String
    },
    height: {
        type: String
    },


    pickupLocation: {
        type: String
    }
});


const productUpdateDetailsModel = mongoose.model("productDetails", productUpdateDetailsSchema);

export default productUpdateDetailsModel;