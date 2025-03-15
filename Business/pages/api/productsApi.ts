import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token is required' });
  }

  // Handle POST request to create a new product
  if (req.method === 'POST') {
    try {
      // Extract product data from the request body
      const { name, description, price, oldPrice, quantity, instock, isFeatured, businessId, images } = req.body;

      // Create FormData to send the data along with the file
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('oldPrice', oldPrice);
      formData.append('quantity', quantity);
      formData.append('instock', instock);
      formData.append('isFeatured', isFeatured);
      formData.append('businessId', businessId);

      // Handle the image file upload if available
      if (images) {
        formData.append('images', images);
      }

      // Send the product data to the backend for creation
      const response = await axios.post(
        `${BASE_URL}/products/createProduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Content type for FormData
          },
        }
      );

      res.status(201).json(response.data);
    } catch (error: any) {
      console.error('Error creating product:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: 'Error creating product', error: error.response ? error.response.data : error.message });
    }

  } 
  // Handle GET request to fetch a product or products
  else if (req.method === 'GET') {
    // Check if the request is to get a single product by productId
    if (req.query.productId) {
      try {
        const { productId } = req.query;

        if (!productId) {
          return res.status(400).json({ message: 'Product ID is required' });
        }

        const response = await axios.get(
          `${BASE_URL}/products/getSingleProduct/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        res.status(200).json(response.data);
      } catch (error: any) {
        console.error('Error fetching product by ID:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching product by ID', error: error.response ? error.response.data : error.message });
      }
    } 
    // Otherwise, it's a request to get products by businessId
    else {
      try {
        const { businessId } = req.query;

        if (!businessId) {
          return res.status(400).json({ message: 'Business ID is required' });
        }

        const response = await axios.get(
          `${BASE_URL}/products/getProductsByBusinessId/${businessId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        res.status(200).json(response.data);
      } catch (error: any) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching products', error: error.response ? error.response.data : error.message });
      }
    }
  } 
  // Handle PUT request to update a product
  else if (req.method === 'PUT') {
    try {
      const { productId } = req.query; // read from query parameter
      const updatedProduct = req.body; // Get the updated product data from request body
    
      if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
      }

      if (!updatedProduct) {
        return res.status(400).json({ message: 'Product data is required' });
      }

      const response = await axios.put(
        `${BASE_URL}/products/updateProduct/${productId}`,
        updatedProduct,  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      res.status(200).json(response.data);
    } catch (error: any) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
      res.status(500).json({
        message: 'Error updating product',
        error: error.response ? error.response.data : error.message,
      });
    }
  } 
  // Handle DELETE request to delete a product
  else if (req.method === 'DELETE') {
    try {
      const { productId } = req.query;  // read from query parameter
    
      if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
    
      const response = await axios.delete(
        `${BASE_URL}/products/deleteProduct/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      res.status(200).json(response.data);
    } catch (error: any) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
      res.status(500).json({
        message: 'Error deleting product',
        error: error.response ? error.response.data : error.message,
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
