import React, { useContext, useState } from "react";
import { 
    View, Text, SafeAreaView, ScrollView, Platform, Pressable, 
    Alert, Dimensions, ImageBackground, Image 
} from "react-native";
import { RootStackScreenProps } from "../Navigations/RootNavigator";
import { HeaderComponent } from "../Components/HeaderComponent";
import { AntDesign, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { CartState } from "../Types/productCartTypes";
import { ProductListParams } from "../Types/HomeProps";
import { addToCart } from "../redux/CartReducer";
import { DisplayMessage } from "../Components/DisplayMessage";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../../UserConText";

// Get the screen dimensions
const { width }: any = Dimensions.get("window");
const height: number = (width * 110) / 120;

const ProductDetails = ({ navigation, route }: RootStackScreenProps<"productDetails">) => {
    const { _id, name, images, price, quantity, storage, size, description } = route.params;
    const productItemObj = route.params;

    const goToPreviousScreen = () => {
        navigation.goBack();
    };

    const cart = useSelector((state: CartState) => state.cart.cart);
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);
    const [message, setMessage] = useState("");
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);
    const {getUserId, setGetUserId} = useContext(UserType)

    // ใช้ useNavigation กับประเภทที่ถูกต้อง
    const navigationTabs = useNavigation(); // ใช้ navigation จาก TabsStack

    const addItemToCart = (ProductItemObj: ProductListParams) => {
        // ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่
        if (getUserId === '') {
            navigation.navigate('UserLogin', { screenTitle: "User Authentication" });
            return;
        }
    
        // ตรวจสอบว่าตะกร้าสินค้าว่างหรือไม่
        if (cart.length === 0) {
            navigation.navigate('TabsStack', { screen: 'Home' });
        } 
        // else {
        //     navigation.navigate('checkoutInfo', { screenTitle: 'Checkout Details' });
        // }
    
        // ตรวจสอบว่าสินค้าหมดสต็อกหรือไม่
        if (ProductItemObj.quantity < 1) {
            showMessage("This Product is Out of Stock");
            return;
        }
    
        // ค้นหาสินค้าในตะกร้า
        const findItem = cart.find((product) => product._id === ProductItemObj._id);
    
        if (findItem) {
            showMessage("Product Already Added to Cart");
        } else {
            setAddedToCart(true);
            dispatch(addToCart(ProductItemObj));
            showMessage("Product Added Successfully");
        }
    };
    
    // ฟังก์ชันช่วยแสดงข้อความแจ้งเตือน
    const showMessage = (message: string) => {
        setMessage(message);
        setDisplayMessage(true);
        setTimeout(() => {
            setDisplayMessage(false);
        }, 3000);
    };
    

    const gotoCartScreen = () => {
        if (cart.length === 0) {
            setMessage("Your Cart is Empty, Please Add Products to Continue");
            setDisplayMessage(true);
            setTimeout(() => {
                setDisplayMessage(false);
            }, 3000);
        } else {
            navigation.navigate("TabsStack", { screen: "cart" });
        }
    };

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0, flex: 1, backgroundColor: "#000" }}>
            {displayMessage && <DisplayMessage message={message} />}
            <HeaderComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} goToPrevious={goToPreviousScreen} />
            <ScrollView style={{ backgroundColor: "#eee" }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ImageBackground style={{ width, height, marginTop: 25 }}>
                        <View style={{ padding: 3, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{
                                width: 40, height: 40, borderRadius: 20, backgroundColor: "#C60C30",
                                flexDirection: "row", justifyContent: "center", alignItems: "center",
                            }}>
                                <Text style={{ color: "white", textAlign: "center", fontWeight: "600", fontSize: 12 }}>30% off</Text>
                            </View>
                            <View style={{
                                width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0",
                                flexDirection: "row", justifyContent: "center", alignItems: "center",
                            }}>
                                <MaterialCommunityIcons name="share-variant" size={24} color="black" />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: 18 }}>
                            <Image style={{ resizeMode: "contain", width: 350, height: 280 }} source={{ uri: images[0] }} />
                        </View>
                        <View style={{
                            width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0",
                            flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "auto", marginLeft: 20, marginBottom: 20,
                        }}>
                            <AntDesign style={{ paddingLeft: 0, paddingTop: 2 }} name="heart" size={20} color="black" />
                        </View>
                    </ImageBackground>
                </ScrollView>
                <ScrollView>
                    <View style={{ backgroundColor: "#fff", borderWidth: 7, borderColor: "#fff", marginTop: 5 }}>
                        <Text style={{ fontSize: 15, fontWeight: "600" }}>{name}</Text>
                        <Text style={{ fontSize: 15, fontWeight: "600", marginTop: 6 }}>&#8358; {price}</Text>
                        <Text style={{ fontSize: 15, fontWeight: "600", marginTop: 6, color: "green" }}>
                            {quantity !== 0 ? "In Stock" : "Out of Stock"}
                        </Text>
                        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
                        <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }}>
                            <Text>Storage: </Text>
                            <Text style={{ color: "gray", fontSize: 15, fontWeight: "bold" }}>{storage}</Text>
                        </View>
                        <View style={{ marginTop: 30, marginHorizontal: 6 }}>
                            <Text style={{ color: "gray", fontSize: 15, fontWeight: "bold" }}>Delivery</Text>
                        </View>
                        <View style={{ backgroundColor: "#fff", borderWidth: 7, borderColor: "#fff", marginTop: 5 }}>
                            <Text style={{ color: "#000" }}>Delivery is Available</Text>
                            <View style={{ flexDirection: "row", marginVertical: 5 }}>
                                <Ionicons name="location" size={24} color={"black"} />
                                <Text style={{ fontSize: 13, fontWeight: "bold" }}>Delivery to Ryo - Nigeria</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 30, marginHorizontal: 6 }}>
                            <Text style={{ fontSize: 13, color: "gray", fontWeight: "500" }}>Product Details</Text>
                        </View>
                        <View style={{ backgroundColor: "#fff", borderWidth: 7, borderColor: "#fff", marginTop: 5 }}>
                            <Text style={{ color: "gray", fontSize: 15, fontWeight: "bold" }}>Description</Text>
                            <Text style={{ color: "#000", fontSize: 15, fontWeight: "500", marginVertical: 2 }}>{description}</Text>
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
            <View style={{ backgroundColor: "white" }}>
                <Pressable 
                    onPress={() => addItemToCart(productItemObj)}
                    style={{ backgroundColor: "#FFC72C", padding: 10, justifyContent: "center", alignItems: "center", marginHorizontal: 7, marginVertical: 5 }}
                >
                    {addedToCart? (
                        <View>
                            <Text style={{ color: "red", fontWeight: "bold", fontSize: 20 }}>Added To Cart</Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={{ color: "green", fontWeight: "bold", fontSize: 20 }}>Add To Cart</Text>
                        </View>
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetails;
