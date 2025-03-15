import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/EditProduct.module.css';

const EditProduct = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imagePreview, setImagePreview] = useState<string>(""); // พรีวิวรูป

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const token = localStorage.getItem('authToken');
        try {
          const response = await axios.get(`/api/productsApi?productId=${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProduct(response.data);
          const productData = response.data as { image: string }; // assert the type of response.data
          setImagePreview(productData.image); // เซ็ตพรีวิวรูปจาก database
        } catch (error: any) {
          console.error('❌ Error fetching product:', error.response?.data || error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setProduct({ ...product, image: file }); // อัปเดตไฟล์ภาพลง state
    }
  };

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);
      formData.append("isFeatured", product.isFeatured);
      
      // ถ้ามีรูปใหม่ อัปโหลดไฟล์ไปเซิร์ฟเวอร์
      if (product.image instanceof File) {
        formData.append("image", product.image);
      }

      const response = await axios.put(`/api/productsApi?productId=${productId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert('แก้ไขสินค้าสำเร็จ!');
      router.push('/HomeScreen');
    } catch (error: any) {
      console.error('❌ Error editing product:', error.response?.data || error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>แก้ไขสินค้า</h1>
      {product ? (
        <form className={styles.form} onSubmit={handleEditSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="image">อัปโหลดรูปภาพ</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.inputField}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Product Preview" className={styles.imagePreview} />
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="name">ชื่อสินค้า</label>
            <input
              type="text"
              id="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">รายละเอียด</label>
            <textarea
              id="description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className={styles.textareaField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="price">ราคา</label>
            <input
              type="number"
              id="price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="quantity">จำนวน</label>
            <input
              type="number"
              id="quantity"
              value={product.quantity}
              onChange={(e) =>
                setProduct({ ...product, quantity: Number(e.target.value) })
              }
              className={styles.inputField}
            />
          </div>

          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="isFeatured"
              checked={product.isFeatured}
              onChange={(e) =>
                setProduct({ ...product, isFeatured: e.target.checked })
              }
            />
            <label htmlFor="isFeatured">Featured</label>
          </div>

          <button type="submit" className={styles.submitButton}>
            บันทึกการแก้ไข
          </button>
        </form>
      ) : (
        <p>ไม่พบข้อมูลสินค้า</p>
      )}
    </div>
  );
};

export default EditProduct;
