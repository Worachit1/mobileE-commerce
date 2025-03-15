import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, Pressable, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { HeaderComponent } from "../Components/HeaderComponent";
import { useSelector } from "react-redux";
import { TabsStackScreenProps } from "../Navigations/TabNavigator";
import { CartState } from "../Types/productCartTypes";
import { UserType } from "../../UserConText";
import { BASE_URL } from "../../BASE_URL";



const ProfileScreen = ({ navigation }: TabsStackScreenProps<"cart">) => {
    const goToPreviousScreen = () => {
        navigation.goBack();
    };

    const cart = useSelector((state: CartState) => state.cart.cart);
    const { getUserId, setGetUserId } = useContext(UserType);
    const [userData, setUserData] = useState<{ firstName: string; lastName: string; mobileNo: string } | null>(null);
    const [editing, setEditing] = useState(false); // State to toggle editing mode
    const [updatedUserData, setUpdatedUserData] = useState({
        firstName: '',
        lastName: '',
        mobileNo: ''
    });

    // ดึง userId และข้อมูลผู้ใช้
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                setGetUserId(token || ""); // ถ้าไม่มี token ให้เซ็ตเป็นค่าว่าง
        
                if (token) {
                    // เรียก API เพื่อดึงข้อมูลผู้ใช้
                    const response = await axios.get(`${BASE_URL}/user/profile/${token}`);
        
                    if (response.data.userProfile && response.data.userProfile.firstName && response.data.userProfile.lastName) {
                        setUserData({
                            firstName: response.data.userProfile.firstName,
                            lastName: response.data.userProfile.lastName,
                            mobileNo: response.data.userProfile.mobileNo,
                        });
                        setUpdatedUserData({
                            firstName: response.data.userProfile.firstName,
                            lastName: response.data.userProfile.lastName,
                            mobileNo: response.data.userProfile.mobileNo,
                        });
                    } else {
                        console.error("Invalid data format:", response.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        
        fetchUser();
    }, []);

    // ฟังก์ชัน Logout
    const logoutHandler = async () => {
        await AsyncStorage.removeItem("authToken"); // ลบ Token
        setGetUserId(""); // ล้างค่า userId
        setUserData(null); // ล้างข้อมูลผู้ใช้
        navigation.navigate('TabsStack', { screen: 'Home' });
    };

    // ฟังก์ชันไปหน้า Login
    const goToLogin = () => {
        navigation.navigate('UserLogin', { screenTitle: "User Authentication" });
    };

    // ฟังก์ชันสำหรับการแก้ไขข้อมูล
    const handleEditToggle = () => {
        setEditing(!editing); // Toggle editing mode
    };

    // ฟังก์ชันสำหรับอัพเดตข้อมูลผู้ใช้
    const handleUpdateProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (token) {
                const url = `${BASE_URL}/user/updateProfile/${token}`;
                console.log("Making API call to:", url);

                const response = await axios.put(
                    url,
                    updatedUserData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, 
                        },
                    }
                );
                setEditing(false); 
                setUserData(updatedUserData); 
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const purchaseHistory = () => {
        navigation.navigate("purchaseHistory" as never);
    };
    
    

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent 
                gotoCartScreen={goToPreviousScreen} 
                cartLength={cart.length} 
                goToPrevious={goToPreviousScreen} 
            />
            
            <Text style={styles.title}>Profile Screen</Text>

            {getUserId ? (
                <>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={updatedUserData.firstName}
                            editable={editing}
                            onChangeText={(text) => setUpdatedUserData({ ...updatedUserData, firstName: text })}
                            placeholder="First Name"
                        />
                        <TextInput
                            style={styles.input}
                            value={updatedUserData.lastName}
                            editable={editing}
                            onChangeText={(text) => setUpdatedUserData({ ...updatedUserData, lastName: text })}
                            placeholder="Last Name"
                        />
                        <TextInput
                            style={styles.input}
                            value={updatedUserData.mobileNo}
                            editable={editing}
                            onChangeText={(text) => setUpdatedUserData({ ...updatedUserData, mobileNo: text })}
                            placeholder="Mobile Number"
                            keyboardType="phone-pad"
                        />
                    </View>

                    {editing ? (
                        <Pressable 
                            onPress={handleUpdateProfile} 
                            style={styles.saveButton}
                        >
                            <Text style={styles.buttonText}>Save Changes</Text>
                        </Pressable>
                    ) : (
                        <Pressable 
                            onPress={handleEditToggle} 
                            style={styles.editButton}
                        >
                            <Text style={styles.buttonText}>Edit</Text>
                        </Pressable>
                    )}

                    <Pressable 
                        onPress={() => navigation.navigate("purchaseHistory", { orders: [] })} 
                        style={styles.purchaseHistory}
                    >
                        <Text style={styles.buttonText}>Open Purchase History</Text>
                    </Pressable>




                    <Pressable 
                        onPress={logoutHandler} 
                        style={styles.logoutButton}
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </Pressable>
                </>
            ) : (
                <Pressable 
                    onPress={goToLogin} 
                    style={styles.loginButton}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        marginTop: -450,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#333",
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#f0f0f0",
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderRadius: 8,
        fontSize: 16,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    loginButton: {
        backgroundColor: "#f39c12",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
    },
    editButton: {
        backgroundColor: "#3498db",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: "#2ecc71",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: "#e74c3c",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    purchaseHistory: {
        backgroundColor: "#8e44ad",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
    },
});

export default ProfileScreen;
