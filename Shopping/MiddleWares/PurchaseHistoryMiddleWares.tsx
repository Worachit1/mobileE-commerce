import axios from 'axios';
import { Alert } from 'react-native';
import { BASE_URL } from '../BASE_URL'; // ให้แน่ใจว่าได้กำหนด BASE_URL
import { Order } from '../src/Types/PurchaseHistory'; 

// รับ userId เป็นพารามิเตอร์
export const fetchPurchaseHistory = async (userId: string): Promise<Order[]> => {
  try {
    const userId = "112233";
    const response = await axios.get(`${BASE_URL}/getOrdersByUserId/${userId}`);
    console.log(response.data);
    return response.data.orders; // สมมุติว่า API คืนค่าฟิลด์ 'orders'
  } catch (error) {
    Alert.alert('Error', 'ไม่สามารถดึงประวัติการสั่งซื้อได้');
    console.error(error);
    return [];
  }
};