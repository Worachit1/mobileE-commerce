import React, { useCallback, useEffect, useState } from "react";
import {View, Text, SafeAreaView, ScrollView, Platform, Pressable, Alert, Dimensions} from 'react-native';
import { TabsStackScreenProps } from "../Navigations/TabNavigator";
import { HeaderComponent } from "../Components/HeaderComponent";
import ImageSlider from "../Components/ImageSlider";
import {CategoryCard} from '../Components/CategoryCard';
import { ProductListParams } from "../Types/HomeProps";
import { fetchCategories, fetchProductsByCatId, fetchTrendingProducts, fetchFeaturedProducts } from "../../MiddleWares/HomeMiddleWares";
import { useFocusEffect } from "@react-navigation/native";
import { ProductCard } from "../Components/ProductCard";
import { useSelector } from "react-redux";
import { CartState } from "../Types/productCartTypes";




const Homescreen = ({navigation, route} : TabsStackScreenProps<'Home'>) => {

    const gotoCartScreen = () => {
        navigation.navigate('cart', {})
    }
    const sliderImages = [
      'https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg',
      'https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg',
      'https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg',
    ]

    const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
    const [getProductByCatId, setGetProductByCatId] = useState<ProductListParams[]>([]);
    const [trendingProducts, setTrendingProducts] = useState<ProductListParams[]>([]);
    const [featuredProducts, setFeaturedProducts] = useState<ProductListParams[]>([]);
    const [bgImg, setBgImg] = useState<string>(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLc2Ij83gCOVj1bb_ooT76kjwIzPlF7GokDQ&s'
    )
    const [activeCat, setActiveCat] = useState<string>('67ae1d912ad376c64b1bc5f9'); 
    const cart = useSelector((state:CartState)=> state.cart.cart)


    useEffect(() => {
        fetchCategories({ setGetCategory });
        fetchTrendingProducts({ setTrendingProducts });
        fetchFeaturedProducts({ setFeaturedProducts });
    }, []);

    useEffect(() => {
        fetchProductsByCatId({ setGetProductByCatId, catId:activeCat });
    }, [activeCat]);

    useFocusEffect(
        useCallback(() => {
            fetchCategories({ setGetCategory });
            fetchProductsByCatId({ setGetProductByCatId, catId:activeCat });
            fetchTrendingProducts({ setTrendingProducts })
            fetchFeaturedProducts({ setFeaturedProducts });
        }, [])
    ); 
    
    const productWidth = Dimensions.get('screen').width/3.2 - 10
    const featuredProductWidth = Dimensions.get('screen').width/3 - 10

    return(
       <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 40:0, flex:1, backgroundColor:'#000'}}>
            <HeaderComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length}/>

            <ScrollView style={{ backgroundColor: '#eee' }}>
                <ImageSlider images={sliderImages} />
                

                {/* Ensure proper spacing */}
                <View style={{ marginVertical: 10 }} />

                <Text style={{ fontSize: 25, marginHorizontal: 10, color: '#000' }}>New Categories</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal:15}} style={{marginTop:4}}
                >
                    
                        {
                            getCategory && getCategory.length > 0 ? (
                                getCategory.map((item, index) => (
                                    <CategoryCard 
                                    key={item._id} 
                                    item={{ 'name': item.name, 'images': item.images, "_id": item._id }}
                                    catStyleProps={{
                                        'height': 80, 'width': 88, 'radius': 20, 'resizeMode': 'contain'
                                    }}
                                    catProps={{
                                        "activeCat": activeCat, 'onPress': () => setActiveCat(item._id)
                                    }}
                                />
                                ))
                            ) :(
                                <Text>Loading categories...</Text>
                            )
                        }
                </ScrollView>

                    <View 
                        style={{
                            backgroundColor: '#eff580', flexDirection: 'row', justifyContent: 'space-between',
                            marginTop: 10
                    }}
                    >
                        <Text style={{fontSize:18, fontWeight:'bold', padding:10}}>Product from Selected Category </Text>
                        <Pressable>
                            <Text style={{padding:10, fontSize:17, fontWeight:'bold'}}> See All</Text>
                        </Pressable>
                    </View>

                    <View 
                        style={{
                            backgroundColor: '#fff', borderWidth:7, borderColor: '#fff', flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'
                        }}
                    >
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                getProductByCatId && getProductByCatId.length > 0 ? (
                                    getProductByCatId.map((item, index) => (
                                        <CategoryCard 
                                        key={item._id} 
                                        item={{ 'name': item.name, 'images': item.images, "_id": item._id }}
                                        catStyleProps={{
                                            'height': 180, 'width': 150, 'radius': 20, 'resizeMode': 'contain'
                                        }}
                                        catProps={{
                                            'imageBg': bgImg,
                                            'onPress': () => {
                                                navigation.navigate('productDetails', {
                                                    _id: item._id,
                                                    name: item.name,
                                                    price: item.price,
                                                    images: item.images,
                                                    quantity: item.quantity,
                                                    description: item.description,
                                                })
                                            }
                                        }}
                                    />
                                    ))
                                ) :(
                                    <Text>The product has not been added yet. ...</Text>
                                )
                            }
                        </ScrollView>
                    </View>

                        <Text 
                            style={{
                                backgroundColor:'silver', fontSize:18, fontWeight:'bold', padding:10, textAlign:'center', marginTop:10
                            }}
                        >
                                Trending Deals of the Week
                        </Text>
                        
         
                    <View 
                        style={{
                            backgroundColor: '#fff', borderWidth:7, borderColor: '#fff', flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'
                        }}
                    >
                        {
                            trendingProducts.map((item, index) => (
                                <ProductCard 
                                    item={{'name':item?.name, 'images':item?.images, 'price':item?.price, '_id':item?._id}}
                                    key={index}
                                    pStyleProps={{'resizeMode':'contain', 'width':productWidth, height:80, 'marginBottom':5}}
                                    productProps={{
                                        'imageBg':bgImg,
                                        'onPress':() => {navigation.navigate('productDetails',{
                                            _id:item._id,
                                            name:item.name,
                                            price:item.price,
                                            images:item.images,
                                            quantity:item.quantity,
                                            description:item.description,
                                        })}
                                    }}
                                />
                            ))
                        }
                    </View>    
                    
                    <View 
                        style={{
                            backgroundColor: '#eff580', flexDirection: 'row', justifyContent: 'space-between',
                            marginTop: 10
                    }}
                    >
                        <Text style={{fontSize:18, fontWeight:'bold', padding:10}}>Limit Deals </Text>
                        <Pressable>
                            <Text style={{padding:10, fontSize:17, fontWeight:'bold'}}> See All</Text>
                        </Pressable>
                    </View>

                    <View 
                        style={{
                            backgroundColor: '#fff', borderWidth:7, borderColor: '#fff', flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'
                        }}
                    >
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {featuredProducts && featuredProducts.length > 0 ? (
                                featuredProducts.map((item, index) => (
                                    <ProductCard 
                                        item={{ 'name': item?.name, 'images': item?.images, 'price': item?.price, '_id': item?._id }}
                                        key={index}  
                                        pStyleProps={{
                                            'resizeMode': 'contain',
                                            width: featuredProductWidth,
                                            height: 155,
                                            'marginHorizontal': 3
                                        }}
                                        productProps={{
                                            'imageBg': bgImg,
                                            'percentageWidth': item.quantity ? (item.quantity / 50) * 100 : 0,

                                        }}
                                    />
                                ))
                            ) : (
                                <Text>...</Text>
                            )}
                        </ScrollView>

                    </View>


            </ScrollView>



       </SafeAreaView>
    )
}

export default Homescreen;

