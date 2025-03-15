import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

// กำหนดชนิดของ `productsFiltered`
interface Product {
  _id: {
    $oid: string;
  };
  name: string;
  description: string;
  image?: string;
}

interface SearchedProductProps {
  productsFiltered: Product[];
  navigation: NavigationProp<any>; // กำหนดประเภทของ navigation
}

const { width } = Dimensions.get("window");

const SearchedProduct: React.FC<SearchedProductProps> = (props) => {
  const { productsFiltered, navigation } = props;

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        navigation.navigate("Product Detail", { item });
      }}
    >
      <Image
        style={styles.thumbnail}
        source={{
          uri: item.image
            ? item.image
            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
      />
      <View style={styles.body}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={productsFiltered}
      keyExtractor={(item) => item._id.$oid}
      renderItem={renderItem}
      contentContainerStyle={{ width: width }}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text>No products match the selected criteria</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  body: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  productName: {
    fontWeight: 'bold',
  },
  productDescription: {
    color: '#888',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export default SearchedProduct;
