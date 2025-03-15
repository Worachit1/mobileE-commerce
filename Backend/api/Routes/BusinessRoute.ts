import express from 'express';
import { businessLogin, businessRegistration ,getBusinessById, getAllBusiness, updateBusiness, deleteBusiness} from '../Controllers/BusinessController';

const router = express.Router();

router.post('/registerBusiness', businessRegistration)
router.post('/loginBusiness', businessLogin)

router.get('/businessProfile/:id', getBusinessById)
router.get('/allBusinesses', getAllBusiness)

router.put('/updateBusiness/:id', updateBusiness)

router.delete('/deleteBusiness/:id', deleteBusiness)

export {router as BusinessRoute}