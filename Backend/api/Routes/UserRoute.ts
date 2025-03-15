import express from 'express';
import {createUserAddress, fetchUserAddress, getUserProfile, userLogin, userRegistration, updateUserProfile, deleteUser} from '../Controllers/UserControllers';
import { create } from 'ts-node';

const router = express.Router();

router.post('/registerUser', userRegistration)
router.post('/loginUser', userLogin)

router.post('/addresses', createUserAddress)

router.get('/addresses/:getUserId', fetchUserAddress)
router.get('/profile/:id', getUserProfile)

router.put('/updateProfile/:id', updateUserProfile)

router.delete('/deleteUser/:id', deleteUser)


export {router as UserRoute}