import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Pressable, StyleSheet, FlatList, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../BASE_URL";
import { HeaderComponent } from "../Components/HeaderComponent";

const PurchaseHistoryScreen = ({ navigation }: any) => {
    const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]); // รายการประวัติการซื้อ
    const [loading, setLoading] = useState(false); // สถานะโหลดข้อมูล

    // ดึงข้อมูลประวัติการซื้อ
    useEffect(() => {
        const fetchPurchaseHistory = async () => {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    const response = await axios.get(`${BASE_URL}/getOrdersByUserId/${token}`);
                    if (response.data) {
                        setPurchaseHistory(response.data); // เซ็ตข้อมูลประวัติการซื้อ
                    } else {
                        console.error("Invalid data format:", response.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching purchase history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchaseHistory();
    }, []);

    // การแสดงผลรายการประวัติการซื้อ
    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.orderNumber}>Order {index + 1}</Text> 
            <Text style={styles.itemText}>ราคา: ${item.totalPrice}</Text>
            <Text style={styles.itemText}>Payment Method: {item.paymentMethod}</Text>
            <Text style={styles.itemText}>Created At: {new Date(item.createAt).toLocaleDateString()}</Text>

            <Text style={styles.subTitle}>Shipping Address:</Text>
            <Text style={styles.itemText}>
                {item.shippingAddress.firstName} {item.shippingAddress.lastName}
            </Text>
            <Text style={styles.itemText}>{item.shippingAddress.mobileNo}</Text>
            <Text style={styles.itemText}>{item.shippingAddress.deliveryInfo}</Text>
            <Text style={styles.itemText}>
                {item.shippingAddress.city}, {item.shippingAddress.region}
            </Text>

            <Text style={styles.subTitle}>Products:</Text>
            {item.Products.map((product: any) => (
                <View key={product._id} style={styles.productContainer}>
                    <Image 
                        source={{ uri: product.images[0] }} 
                        style={styles.productImage} 
                    />
                    <Text style={styles.productText}>Name: {product.name}</Text>
                    <Text style={styles.productText}>Quantity: {product.quantity}</Text>
                    <Text style={styles.productText}>Price: ${product.price}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Purchase History</Text>

            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={purchaseHistory}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.list}
                />
            )}

            <Pressable 
                onPress={() => navigation.goBack()} 
                style={styles.backButton}
            >
                <Text style={styles.buttonText}>Back to Profile</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ecf0f1", // เปลี่ยนสีพื้นหลังให้ดูนุ่มนวล
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#2c3e50",
        marginBottom: 20,
        textAlign: "center", // ทำให้ชื่ออยู่กลาง
    },
    itemContainer: {
        backgroundColor: "#fff",
        padding: 20,
        marginVertical: 12,
        borderRadius: 12,
        shadowColor: "#000", // เพิ่มเงา
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6, // สำหรับ Android
        width: "100%",
    },
    orderNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#2c3e50",
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 12,
        color: "#3498db", // สีสวยๆ
    },
    itemText: {
        fontSize: 16,
        color: "#333",
        marginVertical: 4, // เพิ่มช่องว่างระหว่างข้อความ
    },
    list: {
        width: "100%",
    },
    productContainer: {
        backgroundColor: "#f9f9f9",
        padding: 16,
        borderRadius: 8,
        marginTop: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 4,
    },
    productImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginBottom: 12,
    },
    productText: {
        fontSize: 14,
        color: "#333",
        marginVertical: 4,
    },
    backButton: {
        backgroundColor: "#3498db",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    loadingText: {
        fontSize: 18,
        color: "#3498db",
        textAlign: "center",
        marginTop: 20,
    },
});

export default PurchaseHistoryScreen;
