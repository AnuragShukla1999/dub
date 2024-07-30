import express from 'express';
import { UploadProductDetails, updateProductDetails, deleteProductDetailsById, deleteAllProduct } from '../controllers/productController.js';
import { getProductDetails, getProductDetailsById } from '../controllers/getProductDetails.js'

const router = express.Router();


router.post('/productorderdetails', UploadProductDetails);
router.get('/getproductdetails', getProductDetails);
router.get('/getproductdetails/:id', getProductDetailsById);
router.put('/updateproductdetails/:id', updateProductDetails);
router.delete('/deleteproductdetails/:id', deleteProductDetailsById);
router.delete('/deleteallproduct', deleteAllProduct);

export default router;