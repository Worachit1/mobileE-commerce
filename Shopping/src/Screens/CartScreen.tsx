import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Platform, Pressable, Image } from "react-native";
import { TabsStackScreenProps } from "../Navigations/TabNavigator";
import { HeaderComponent } from "../Components/HeaderComponent";
import { useDispatch, useSelector } from "react-redux";
import { CartState } from "../Types/productCartTypes";
import { DisplayMessage } from "../Components/DisplayMessage";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ProductListParams } from "../Types/HomeProps";
import { decreaseQuantity, removeFromCart, increaseQuantity } from "../redux/CartReducer";
import { UserType } from "../../UserConText";

const CartScreen = ({ navigation , route}: TabsStackScreenProps<"cart">) => {
  const goToPreviousScreen = () => {
    navigation.goBack();
  };

  const cart = useSelector((state: CartState) => state.cart.cart);
  const total = cart?.reduce((curr, item) => curr + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);
  const {getUserId, setGetUserId} = useContext(UserType)
  // console.log('tihs is the UserId', getUserId)

  const proceed = () =>{
    if(getUserId === '') {
      navigation.navigate('UserLogin', { screenTitle: "User Authentication" });

    }else{
      if(cart.length === 0){
        navigation.navigate('TabsStack', {"screen":'Home'})
      }else{
        navigation.navigate('checkoutInfo', {screenTitle:'Checkout Details'});
      }
    }
  }

  const showMessage = (text: string) => {
    setMessage(text);
    setDisplayMessage(true);
    setTimeout(() => setDisplayMessage(false), 3000);
  };

  const decreaseItem = (item: ProductListParams) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item));
      showMessage("Product Quantity Updated Successfully");
    } else {
      dispatch(removeFromCart(item));
      showMessage("Product Removed Successfully");
    }
  };

  const increaseItem = (item: ProductListParams) => {
    dispatch(increaseQuantity(item));
    showMessage("Product Quantity Updated Successfully");
  };

  const deleteItem = (item: ProductListParams) => {
    dispatch(removeFromCart(item));
    showMessage("Product Removed Successfully");
  };

  useEffect(() => {
    if(cart.length === 0 ){

        setMessage("Your Cart is Empty, Please Add Products to Continue");
        setDisplayMessage(true);
        setTimeout(() => {
          setDisplayMessage(false);
          navigation.navigate("TabsStack",{"screen":"Home"})
        }, 3000);
    }
  }, [cart.length])

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0, flex: 1, backgroundColor: "#000" }}>
      {displayMessage && <DisplayMessage message={message} />}
      <HeaderComponent gotoCartScreen={goToPreviousScreen} cartLength={cart.length} goToPrevious={goToPreviousScreen}/>
      
      <View style={{ backgroundColor: "#eee", padding: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: "400" }}>Subtotal:</Text>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>{"\u0E3F"}{total.toFixed(2)}</Text>

        <Pressable
          onPress={proceed} 
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text>Proceed to Buy ({cart.length} items)</Text>
        </Pressable>

      </View>

      <ScrollView style={{ backgroundColor: "#fff", flex: 1 }} showsVerticalScrollIndicator={false}>
        {cart.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#fff",
              marginVertical: 10,
              borderBottomColor: "#F0F0F0",
              borderBottomWidth: 2,
              padding: 10,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Image style={{ width: 140, height: 140, resizeMode: "contain" }} source={{ uri: item.images[0] }} />
              <View>
                <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                  {item.name}
                </Text>
                <Text style={{ width: 150, marginTop: 10, fontSize: 25, fontWeight: "bold" }}>{"\u0E3F"} {item.price}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 }}>
              <Pressable onPress={() => decreaseItem(item)} style={buttonStyle}>
                <AntDesign name={item.quantity > 1 ? "minus" : "delete"} size={22} color="black" />
              </Pressable>

              <View style={{ backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 6 }}>
                <Text>{item.quantity}</Text>
              </View>

              <Pressable onPress={() => increaseItem(item)} style={buttonStyle}>
                <Feather name="plus" size={24} color="black" />
              </Pressable>

              <Pressable onPress={() => deleteItem(item)} style={deleteButtonStyle}>
                <Text>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const buttonStyle = {
  backgroundColor: "#D8D8D8",
  padding: 7,
  borderRadius: 6,
};

const deleteButtonStyle = {
  backgroundColor: "#D8D8D8",
  padding: 10,
  borderRadius: 5,
  borderWidth: 0.6,
  borderColor: "#C0C0C0",
};

export default CartScreen;
