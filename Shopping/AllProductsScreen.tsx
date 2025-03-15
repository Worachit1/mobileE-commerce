// import React from "react";
// import { View, Text, FlatList, SafeAreaView } from "react-native";
// import { ProductCard } from "../Components/ProductCard";

// const AllProductsScreen = ({ route, navigation }) => {
//     const { products, title } = route.params;

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//             <Text style={{ fontSize: 24, fontWeight: "bold", padding: 10 }}>{title}</Text>
//             <FlatList
//                 data={products}
//                 keyExtractor={(item) => item._id}
//                 renderItem={({ item }) => (
//                     <ProductCard
//                         item={{ name: item?.name, images: item?.images, price: item?.price, _id: item?._id }}
//                         pStyleProps={{ resizeMode: "contain", width: 100, height: 150, marginBottom: 10 }}
//                         productProps={{
//                             onPress: () => navigation.navigate("productDetails", { 
//                                 _id: item._id, 
//                                 name: item.name, 
//                                 price: item.price, 
//                                 images: item.images, 
//                                 quantity: item.quantity, 
//                                 description: item.description 
//                             }),
//                         }}
//                     />
//                 )}
//                 numColumns={2}
//                 contentContainerStyle={{ paddingHorizontal: 10 }}
//             />
//         </SafeAreaView>
//     );
// // }

// export default AllProductsScreen;
