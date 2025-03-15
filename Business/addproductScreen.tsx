import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/addProduct.module.css';
import { BASE_URL } from '../BASE_URL';

const AddProductScreen = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    oldPrice: '',
    quantity: '',
    instock: true,  // ตั้งค่าเริ่มต้นเป็น true
    isFeatured: false,  // ตั้งค่าเริ่มต้นเป็น false
    category: '', // เพิ่ม category
    images: null as File | null,
  });

  const router = useRouter();
  const token = localStorage.getItem('authToken');
  const businessId = localStorage.getItem('businessId');

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categoriesApi');
        setCategories(response.data as any[]);
      } catch (error) {
        console.error('❌ Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProduct({ ...product, images: file });
    }
  };

  // Handle checkbox change for isFeatured
  const handleIsFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, isFeatured: e.target.checked });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // ตรวจสอบค่า businessId ก่อนที่จะใช้
    console.log('businessId from localStorage:', localStorage.getItem('businessId')); // เพิ่มตรงนี้
  
    if (!token || !businessId) {
      alert('Missing authentication token or business ID.');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('oldPrice', product.oldPrice);
    formData.append('quantity', product.quantity);
    formData.append('instock', 'true'); // เปลี่ยนเป็น true
    formData.append('isFeatured', String(product.isFeatured)); // เปลี่ยนเป็น boolean
    formData.append('category', product.category);
    formData.append('businessId', businessId);
  
    if (product.images) {
      formData.append('images', product.images);
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/products/createProduct`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      alert('✅ Product created successfully!');
      router.push('/');
    } catch (error: any) {
      console.error('❌ Error creating product:', error.response?.data); // ดูข้อมูลที่ส่งกลับจาก Backend
      alert(`❌ ${error.response?.data || 'Failed to create product. Please try again.'}`);
    }
  };
  
  
  


  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Add New Product</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required className={styles.input} />
          <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required className={styles.input} />
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required className={styles.input} />
          <input type="number" name="oldPrice" placeholder="Old Price" value={product.oldPrice} onChange={handleChange} className={styles.input} />
          <input type="number" name="quantity" placeholder="Quantity" value={product.quantity} onChange={handleChange} required className={styles.input} />

          {/* Category Dropdown */}
          <select name="category" value={product.category} onChange={handleChange} required className={styles.input}>
            <option value="" disabled>Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* File upload input */}
          <input type="file" name="images" accept="image/*" onChange={handleImageChange} className={styles.input} />

          {/* Checkbox for isFeatured */}
          <label className={styles.checkboxLabel}>
            Featured Product
            <input 
              type="checkbox" 
              name="isFeatured" 
              checked={product.isFeatured} 
              onChange={handleIsFeaturedChange}
              className={styles.checkbox} 
            />
          </label>

          <button type="submit" className={styles.button}>
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductScreen;
