import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/ProductTable.module.css';  

const HomeScreen = () => {
  const [businessData, setBusinessData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      const businessId = localStorage.getItem('businessId');
      const token = localStorage.getItem('authToken');
    
      if (!businessId || !token) {
        console.error('❌ Missing businessId or token');
        return;
      }
    
      try {
        const response = await axios.get(`/api/profileApi?businessId=${businessId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBusinessData(response.data);
    
        const productResponse = await axios.get(`/api/productsApi?businessId=${businessId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        console.log('Product data:', productResponse.data); // ตรวจสอบข้อมูลที่ได้รับจาก API
        setProducts(productResponse.data as any[]);
      } catch (error: any) {
        console.error('❌ Error fetching business profile or products:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    
    

    fetchBusinessProfile();
  }, []);

  // ฟังก์ชันลบสินค้า
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) return;

    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`/api/productsApi?productId=${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProducts(products.filter(product => product._id !== productId));
      alert('ลบสินค้าสำเร็จ!');
    } catch (error: any) {
      console.error('❌ Error deleting product:', error.response?.data || error.message);
    }
  };

  //editProduct
  const gotoEditProduct = async (productId: string) => {
    router.push(`/editProduct/${productId}`);
  };
  

const handleCreateProduct = () => {
  router.push('/addproductScreen'); // Navigate to the add product page
};

  return (
    <div>
      <h1>Business Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {businessData ? (
            <div>
              <p><strong>First Name:</strong> {businessData.firstName}</p>
              <p><strong>Last Name:</strong> {businessData.lastName}</p>
              <p><strong>Mobile Phone:</strong> {businessData.mobileNo}</p>
              <br />
              <h2>Products By BusinessId</h2>
              <button onClick={handleCreateProduct} className={styles['create-button']}>
                ➕ Add Product
              </button>

              {products.length > 0 ? (
                <div className={styles['table-container']}>
                  <table className={styles['product-table']}>
                    <thead>
                      <tr>
                        <th>ลำดับ</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Old Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Business</th>
                        <th>In Stock</th>
                        <th>Featured</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => {
                      console.log('Product:', product);  // เพิ่มการตรวจสอบข้อมูล
                      return (
                        <tr key={product._id}>
                          <td>{index + 1}</td>
                          <td>
                            <img src={product.images[0]} alt={product.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                          </td>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>${product.price}</td>
                          <td>${product.oldPrice}</td>
                          <td>{product.quantity}</td>
                          <td>{product.category.name}</td>
                          <td>{product.businessId.firstName}</td>
                          <td>{product.instock ? 'Yes' : 'No'}</td>
                          <td>{product.isFeatured ? 'Yes' : 'No'}</td>
                          <td className={styles['action-buttons']}>
                            <button onClick={() => gotoEditProduct(product._id)} className={styles['edit-button']}>✏️ Edit</button>
                            <button onClick={() => handleDeleteProduct(product._id)} className={styles['delete-button']}>❌ Delete</button>
                          </td>
                        </tr>
                      );
                    })}

                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No products found.</p>
              )}
            </div>
          ) : (
            <p>No business profile found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default HomeScreen;
