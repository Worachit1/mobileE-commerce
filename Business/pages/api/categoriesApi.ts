import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // เรียก API Backend จริง (เช่น Express หรือ NestJS)
    const response = await axios.get(`${BASE_URL}/category/getCategories`); // URL ของ Backend
    res.status(200).json(response.data); 
  } catch (error: any) {
    console.error('❌ Error fetching categories:', error.message); // ดูข้อความ error ใน server console
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
