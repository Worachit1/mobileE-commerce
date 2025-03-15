
import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Platform, Pressable, Image, KeyboardAvoidingView, 
    Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { HeaderComponent } from "../Components/HeaderComponent";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons,AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { RootStackScreenProps } from "../Navigations/RootNavigator";
import { UserDataForm } from "../Components/UserDataFrorm";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../../UserConText";
import {BASE_URL} from "../../BASE_URL";

const AddAdress = ({navigation, route}:RootStackScreenProps<'userAddress'>) => {


    const {firstName,  lastName, email, mobileNo, deliveryInfo, region, city, screenTitle} = route.params;
    
    
    const userFormParams = {
            firstName,  
            lastName, 
            email,
            mobileNo, 
            deliveryInfo,
            region,
            city,
            
        }
    const [userAddressForm, setUserAdressForm] = useState(userFormParams)
        // console.log(userSignupForm)
    
    const handleOnchangeText = (text:string, fieldName:string)=>{
        setUserAdressForm({...userAddressForm, [fieldName]:text})
    }

    const {getUserId, setGetUserId} = useContext(UserType)

    useEffect(() => {
        const fetchUser = async() => {
            const token:any = await AsyncStorage.getItem('authToken');
            const getUserId:string = token
            setGetUserId(getUserId)
            //console.log(`this is the new user id ${getUserId}`)
        }

        fetchUser();
    }, [])


    const submitAddressForm = () => {
        axios.post(`${BASE_URL}/user/addresses`, {getUserId, userAddressForm}).then((response) => {
            //console.log(response)
            Alert.alert('User Registration Complete Successfully!')
            setUserAdressForm(userAddressForm);
            setTimeout(() => {
                navigation.goBack()
            }, 500)
        }).catch((error) => {
            Alert.alert('error',error);
        })
    }

    const hanadleKeyboardDismiss = () => {
        Keyboard.dismiss();
    }

    

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#fff', alignItems:'center'}} >     
            <HeaderComponent pageTitle={screenTitle} goToPrevious={()=>navigation.goBack()}/>       
            <TouchableWithoutFeedback onPress={hanadleKeyboardDismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding':"height"}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:50}}>  
                        <KeyboardAvoidingView>
                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#041E42', marginBottom: 20 }} >
                                    Add a new Address
                                </Text>
                            </View>

                            <ScrollView>
                                <View style={{marginTop:10}}>
                                    <UserDataForm
                                        label='Enter Your FirstName'
                                        labelColor="black"
                                        duration={300}
                                        text={userAddressForm.firstName}
                                        updateText={(text:string)=>handleOnchangeText(text, 'firstName')}
                                    />
                                    <View style={{marginTop:10}}/>
                                    <UserDataForm 
                                        label='Enter Your LastName'
                                        labelColor="black"
                                        duration={300}
                                        text={userAddressForm.lastName}
                                        updateText={(text:string)=>handleOnchangeText(text, 'lastName')}
                                    />
                                    <View style={{marginTop:10}}/>
                                    <UserDataForm 
                                        label='Enter Your Email'
                                        labelColor="black"
                                        duration={300}
                                        text={userAddressForm.email}
                                        updateText={(text:string)=>handleOnchangeText(text, 'email')}
                                    />
                                    <View style={{marginTop:10}}/>
                                    <UserDataForm 
                                        label='Enter Your Mobile Number'
                                        labelColor="black"
                                        duration={300}
                                        text={userAddressForm.mobileNo}
                                        updateText={(text:string)=>handleOnchangeText(text, 'mobileNo')}
                                    />
                                    <View style={{marginTop:10}}/>
                                    <UserDataForm 
                                        label='Enter Your Delivery Address'
                                        labelColor="black"
                                        duration={300}
                                        text={userAddressForm.deliveryInfo}
                                        updateText={(text:string)=>handleOnchangeText(text, 'deliveryInfo')}
                                    />
                                    <View style={{marginTop:10}}/>
                                    <UserDataForm 
                                        label='Enter Your Regiom'
                                        labelColor="black"
                                        duration={300}
                                        text={userAddressForm.region}
                                        updateText={(text:string)=>handleOnchangeText(text, 'region')}
                                    />
                                    <View style={{marginTop:10}}/>
                                    <UserDataForm 
                                        label='Enter Your City'
                                        labelColor="black"
                                        duration={300}
                                        text={userAddressForm.city}
                                        updateText={(text:string)=>handleOnchangeText(text, 'city')}
                                    />


                                </View>
                                
                            </ScrollView>                          
                            
                            <Pressable
                                style={{width:200, backgroundColor:'#FFC72C', borderRadius:6, marginLeft:'auto',
                                    marginRight:'auto', padding:15, marginTop:15
                                }}
                                 onPress={submitAddressForm}
                            >
                                <Text style={{textAlign:'center', color:'#fff', fontSize:16, fontWeight:'bold'}}>
                                    Add Address
                                </Text>

                            </Pressable>
                                                                                    
                                                                        
                        </KeyboardAvoidingView>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>                      
        </SafeAreaView>
    )
}

export default AddAdress;