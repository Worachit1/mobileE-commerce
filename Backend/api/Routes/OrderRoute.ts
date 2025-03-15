import express from 'express';
import { addOrder ,getOrdersByUserId} from '../Controllers/';

const router = express.Router();

router.post('/orders', addOrder)

router.get('/getOrdersByUserId/:userId',getOrdersByUserId)





export {router as OrdersRoute}