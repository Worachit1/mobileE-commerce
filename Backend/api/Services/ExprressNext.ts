import express, { Request, Response } from 'express';
const cors = require('cors');

const app = express();
const PORT = 9000;

// Use CORS middleware to allow requests from different origins
app.use(cors({
    origin: 'http://localhost:3000',  // URL ของ frontend (Next.js) หรือที่คุณต้องการให้อนุญาต
    // ถ้าคุณใช้ React Native บนอุปกรณ์จริง, เปลี่ยนเป็น IP address ของ backend (เช่น http://192.168.1.100:9000)
    // origin: 'http://your-react-native-ip-address:port', 
  }));

// Middleware to parse JSON request bodies
app.use(express.json());

// API endpoint to handle POST requests for business registration
app.post('/business/registerBusiness', (req: Request, res: Response) => {
  // You can access the request body here using req.body
  console.log(req.body);

  // Respond with a success message for now
  res.status(200).send('Business registration endpoint hit successfully!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
