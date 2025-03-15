import React from 'react';
import { FetchProductsParam, ProductListParams } from '../src/Types/HomeProps';
import { BASE_URL } from '../BASE_URL';

import axios from 'axios';

interface ICatProps {
    setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}

interface IProdByCatProps {
    catId : string;
    setGetProductByCatId: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}

interface ITrendingProductProps {
    setTrendingProducts: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}

interface IFeaturedProductProps {
    setFeaturedProducts: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}

export const fetchCategories = async ({ setGetCategory }: ICatProps) => {
    try {
        const response = await axios.get<ProductListParams[]>(`${BASE_URL}/category/getCategories`);
        
        
        if (Array.isArray(response.data)) {
            setGetCategory(response.data); 
        } else {
            console.error('API Response ไม่ใช่ array:', response.data);
        }
    } catch (err) {
        console.error('API Error:', err);
    }
};

export const fetchProductsByCatId = async ({ setGetProductByCatId, catId }: IProdByCatProps) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/getProductByCatId/${catId}`);

        if (response?.data?.result) {
            setGetProductByCatId(response.data.result);
        } else {
            console.warn("No products found for this category.");
            setGetProductByCatId([]); 
        }

    } catch (err) {
        console.error("An error occurred [getProductByCatId]:", err);
    }
};


export const fetchTrendingProducts = async ({ setTrendingProducts }: ITrendingProductProps) => {
    try {
      const response = await axios.get<{ result: ProductListParams[] }>(`${BASE_URL}/products/trendingProducts/`);
      setTrendingProducts(response.data.result);
    } catch (err) {
      console.log('An error occurred', err);
    }
};

export const fetchFeaturedProducts = async ({ setFeaturedProducts }: IFeaturedProductProps) => {
    try {
      const response = await axios.get<{ Products: ProductListParams[] }>(`${BASE_URL}/products/featuredProduct/`);
  
      const { Products } = response.data;  
      setFeaturedProducts(Products);
    } catch (err) {
      console.log('An error occurred', err);
    }
  };
  
  
  



