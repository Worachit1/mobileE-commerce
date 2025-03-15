// pages/api/profileApi.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { businessId } = req.query;
            
            // ✅ ดึง token จาก request headers หรือ query params
            const token = req.headers.authorization?.split(' ')[1] || req.query.token;

            console.log('Received businessId:', businessId);
            console.log('Received Token:', token);

            if (!businessId) {
                return res.status(400).json({ message: 'Business ID is required' });
            }

            if (!token) {
                return res.status(400).json({ message: 'Token is required' });
            }

            // ✅ ส่ง token ไปพร้อมกับ request
            const response = await axios.get(`${BASE_URL}/business/businessProfile/${businessId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            res.status(200).json(response.data);
        } catch (error: any) {
            console.error('Error fetching business data:', error);
            res.status(500).json({ message: 'Error fetching business data', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}



