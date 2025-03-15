import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const { businessSignupForm } = req.body;  // รับข้อมูลธุรกิจ
  
        // ส่งข้อมูลไปยัง backend ที่กำหนด (API ของคุณ)
        const response = await axios.post(`${BASE_URL}/business/registerBusiness`, businessSignupForm);
        console.log('Sending data to backend:', businessSignupForm);
        console.log('Response from backend:', response.data);
        
        // ส่ง response กลับไปที่ frontend
        res.status(200).json({ message: 'Business Registration Complete Successfully!' });
      } catch (error: any) {
        console.error('Error in registration:', error.response?.data || error.message); // แสดงข้อมูลข้อผิดพลาดที่ชัดเจน
        res.status(500).json({ message: 'Registration Error', error: error.response?.data?.message || error.message });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }