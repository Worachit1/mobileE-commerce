import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL';



interface LoginResponse {
  token: string;
  businessId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
      try {
          const { businessLoginForm } = req.body;  
          
          // Add type to the response
          const response = await axios.post<LoginResponse>(`${BASE_URL}/business/loginBusiness`, businessLoginForm);

          console.log('Response from backend:', response.data); // Check the response data
        
          const token = response.data.token;
          const businessId = response.data.businessId; // Check if businessId exists

          console.log('Token:', token);
          console.log('BusinessId:', businessId);

          // Send the response back to the frontend
          res.status(200).json({ token, businessId });
      } catch (error: any) {
          console.error('Error in Login:', error.response?.data || error.message);
          res.status(500).json({ message: 'Login Error', error: error.response?.data?.message || error.message });
      }
  } else {
      res.status(405).json({ message: 'Method Not Allowed' });
  }
}

