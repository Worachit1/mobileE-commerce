
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
import { BASE_URL } from "../../BASE_URL";



const UserAuth = ({navigation, route}:RootStackScreenProps<'UserLogin'>) => {

    const [showRegistrationScreen, setShowRegistrationScreen] = useState<boolean>(false)

    const {firstName,  lastName, email, password, confirmPassword, mobileNo} = route.params;
    const {getUserId, setGetUserId} = useContext(UserType)

    const userRegistrationParams = {
        firstName,  
        lastName, 
        email,
        mobileNo, 
        password, 
        confirmPassword, 
        
    }
    const [userSignupForm, setUserSignupForm] = useState(userRegistrationParams)
    // console.log(userSignupForm)

    const handleSignUpTextchange = (text:string, fieldName:string)=>{
        setUserSignupForm({...userSignupForm, [fieldName]:text})
    }

    const submitRegistrationForm = () => {
        axios.post(`${BASE_URL}/user/registerUser`, userSignupForm).then((response) => {
            console.log(response)
            Alert.alert('User Registration Complete Successfully!')
            setShowRegistrationScreen(false);
            setUserSignupForm(userRegistrationParams)
        }).catch((error) => {
            Alert.alert('Registration Error',error.message);
            console.log(error)
        })
    }

    const userLoginParams = {
        email,
        password, 
    }
    const [userLoginForm, setUserLoginForm] = useState(userLoginParams)
    // console.log(userLoginForm)

    const handleLoginTextchange = (text:string, fieldName:string)=>{
        setUserLoginForm({...userLoginForm, [fieldName]:text})
    }

    const submitUserLoginForm = () => {
        axios.post(`${BASE_URL}/user/loginUser`, userLoginForm).then((response) => {
            console.log(response)
            const token = response.data.token;
            AsyncStorage.setItem('authToken',token)
            Alert.alert('Login Successfull')
            navigation.navigate('TabsStack', { screen: 'cart' });
            setUserLoginForm(userLoginParams)
        }).catch((error) => {
            Alert.alert('Login Error',error.message);
            console.log(error)
        })
    }

    useEffect(() => {
        const fetchUser = async() => {
            const token:any = await AsyncStorage.getItem('authToken');
            const getUserId:string = token
            setGetUserId(getUserId)
            console.log(`this is the new user id ${getUserId}`)
        }

        fetchUser();
    }, [])

    const hanadleKeyboardDismiss = () => {
        Keyboard.dismiss();
    }

    const { screenTitle } = route.params || {};


    return (
            <SafeAreaView style={{flex:1, backgroundColor:'#fff', alignItems:'center'}} >     
                <HeaderComponent pageTitle={screenTitle} goToPrevious={()=>navigation.goBack()}/>       
                <TouchableWithoutFeedback onPress={hanadleKeyboardDismiss}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding':"height"}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View>

                            </View>

                            <KeyboardAvoidingView>
                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#041E42', marginBottom: 20 }} >
                                        {showRegistrationScreen ? 'Register a New Account' : 'Login to your Account'}
                                    </Text>
                                </View>
                                {showRegistrationScreen && (

                                    <>
                                        <ScrollView>
                                            <View style={{marginTop:10}}>
                                                <UserDataForm 
                                                    label='Enter Your FirstName'
                                                    labelColor="black"
                                                    duration={300}
                                                    text={userSignupForm.firstName}
                                                    updateText={(text:string)=>handleSignUpTextchange(text, 'firstName')}
                                                />

                                            </View>
                                            <View style={{marginTop:10}}>
                                                <UserDataForm 
                                                    label='Enter Your LastName'
                                                    labelColor="black"
                                                    duration={300}
                                                    text={userSignupForm.lastName}
                                                    updateText={(text:string)=>handleSignUpTextchange(text, 'lastName')}
                                                />

                                            </View>
                                            <View style={{marginTop:10}}>
                                                <UserDataForm 
                                                    label='Enter Your Email'
                                                    labelColor="black"
                                                    duration={300}
                                                    text={userSignupForm.email}
                                                    updateText={(text:string)=>handleSignUpTextchange(text, 'email')}
                                                />

                                            </View>
                                            <View style={{marginTop:10}}>
                                                <UserDataForm 
                                                    label='Enter Your Mobile Number'
                                                    labelColor="black"
                                                    duration={300}
                                                    text={userSignupForm.mobileNo}
                                                    updateText={(text:string)=>handleSignUpTextchange(text, 'mobileNo')}
                                                />

                                            </View>
                                            <View style={{marginTop:10}}>
                                                <UserDataForm 
                                                    label='Enter Your Password'
                                                    labelColor="black"
                                                    duration={300}
                                                    text={userSignupForm.password}
                                                    updateText={(text:string)=>handleSignUpTextchange(text, 'password')}
                                                />

                                            </View>
                                            <View style={{marginTop:10}}>
                                                <UserDataForm 
                                                    label='Confirm Your Password'
                                                    labelColor="black"
                                                    duration={300}
                                                    text={userSignupForm.confirmPassword}
                                                    updateText={(text:string)=>handleSignUpTextchange(text, 'confirmPassword')}
                                                />
                                            </View>
                                        </ScrollView>
                                    </>
                                )}
                                {!showRegistrationScreen && (
                                    <>
                                        <View style={{marginTop:10}}>
                                                <UserDataForm 
                                                    label='Enter Your Email'
                                                    labelColor="black"
                                                    duration={300}
                                                    text={userLoginForm.email}
                                                    updateText={(text:string)=>handleLoginTextchange(text, 'email')}
                                                />
                                        </View>
                                        <View style={{marginTop:10}}>
                                                <UserDataForm 
                                                    label='Enter Your Password'
                                                    labelColor="black"
                                                    duration={300}
                                                    text={userLoginForm.password}
                                                    updateText={(text:string)=>handleLoginTextchange(text, 'password')}
                                                />
                                        </View>

                                        <View style={{margin:13, flexDirection:'row', alignItems:'center',
                                                justifyContent:'space-between'
                                            }}
                                        >
                                            <Text>Keep me Logged In</Text>
                                            <Text style={{color:'#007fff', fontWeight:'bold'}}>Forgot Password</Text>

                                        </View>
                                    </>
                                )}
                                
                                <View style={{marginTop:50}} />
                                
                                
                                {!showRegistrationScreen?
                                    <Pressable
                                        style={{width:200, backgroundColor:'#febe10', borderRadius:6, marginLeft:'auto',
                                            marginRight:'auto', padding:15
                                        }}
                                        onPress={submitUserLoginForm}
                                    >
                                        <Text style={{textAlign:'center', color:'#fff', fontSize:16, fontWeight:'bold'}}>
                                            Login
                                        </Text>

                                    </Pressable>

                                    :
                                    <Pressable
                                        style={{width:200, backgroundColor:'#febe10', borderRadius:6, marginLeft:'auto',
                                            marginRight:'auto', padding:15
                                        }}
                                        onPress={submitRegistrationForm}
                                    >
                                        <Text style={{textAlign:'center', color:'#fff', fontSize:16, fontWeight:'bold'}}>
                                            Register
                                        </Text>

                                    </Pressable>
                                }


                                {!showRegistrationScreen?
                                <Pressable
                                    style={{marginTop:15}}
                                    onPress={()=> setShowRegistrationScreen(true)}
                                >
                                    <Text style={{textAlign:'center', color:'grey', fontSize:16}}>
                                        Don't have ana account? Sign Up
                                    </Text>

                                </Pressable>

                                :
                                <Pressable
                                    style={{marginTop:15, marginBottom:30}}
                                    onPress={() => setShowRegistrationScreen(false)}
                                >
                                    <Text style={{textAlign:'center', color:'grey', fontSize:16}}>
                                        Already have an account Login
                                    </Text>

                                </Pressable>
                            }
                            </KeyboardAvoidingView>

                        </ScrollView>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
                
              

            </SafeAreaView>
    )
}

export default UserAuth;