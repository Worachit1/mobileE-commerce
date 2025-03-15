import express, {Request, Response} from 'express';

import multer from 'multer';
import path from 'path';

import { createProduct, getAllCProducts,  getFeaturedProducts, getProduct, getProductByCatId, getTrendingProducts, getWelcomeProducts, updateProduct, deleteProduct, getProductsByBusinessId} from '../Controllers';

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'assets')
    },

    filename: function(req, file, cb){
        cb(null, req.body.name+'-'+Date.now() + path.extname(file.originalname))
    }
})

const images = multer({storage: imageStorage}).array('images');


router.post('/createProduct', images, createProduct);

router.get('/getProductByCatId/:catId', getProductByCatId);
router.get('/getproducts', getAllCProducts);
router.get('/getSingleProduct/:id', getProduct);
router.get('/featuredProduct/', getFeaturedProducts);
router.get('/trendingProducts/', getTrendingProducts);
router.get('/welcomeProduct/', getWelcomeProducts);
router.get('/getProductsByBusinessId/:businessId', getProductsByBusinessId);


router.put('/updateProduct/:id', images, updateProduct);

router.delete('/deleteProduct/:id', deleteProduct);



export {router as ProductRoute}