import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Platform, Pressable,StyleSheet } from "react-native";
import { HeaderComponent } from "../Components/HeaderComponent";
import { useDispatch, useSelector } from "react-redux";
import { CartState } from "../Types/productCartTypes";
import { DisplayMessage } from "../Components/DisplayMessage";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { ProductListParams } from "../Types/HomeProps";
import { decreaseQuantity, removeFromCart, increaseQuantity, emptyCart } from "../redux/CartReducer";
import { UserType } from "../../UserConText";
import { RootStackScreenProps } from "../Navigations/RootNavigator";
import { Cstep, UserAddress } from "../Types/DeliveryProps";
import { DeliveryAddress } from "../Components/DeliveryComponents/DeliveryAddress";
import { fetchAddress, placeOrderByCash } from "../../MiddleWares/DeliveryMiddleWare";
import { useFocusEffect } from "@react-navigation/native";
import { CashPaymentMethod } from "../Components/DeliveryComponents/CashPaymentMethod";
import { CardPaymentMethod } from "../Components/DeliveryComponents/CardPaymentOption";
import { CashPayment } from "../Components/DeliveryComponents/CashPayment";


const DeliveryScreen = ({ navigation, route }: RootStackScreenProps<"checkoutInfo">) => {

    const { screenTitle } = route.params || {};
    const steps = [
        {title:'Address', content:'Address Form'},
        {title:'Delivery', content:'Delivery Options'},
        {title:'Payment', content:'Payment Details'},
        {title:'Address', content:'Oder Summary'},

    ]

    const [currentStep, setCurrentStep] = useState<Cstep>(0)
    const [address, setAddress] = useState<UserAddress[]>([]);
    const {getUserId, setGetUserId} = useContext(UserType)
    const [selectedAddres, setSelectedAddress] = useState<UserAddress>({})
    const [option, setOption] = useState(false)
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('')

    const cart = useSelector((state: CartState) => state.cart.cart);
    const total = cart?.reduce((curr, item) => curr + item.price * item.quantity, 0);

    // console.log(selectedAddres)
    

    const goToAddress = () => {
        navigation.navigate('userAddress', { screenTitle: 'User Address Details' });
    }

     useEffect(() => {
            fetchAddress({getUserId, setAddress})
        }, []);

    useFocusEffect(
            useCallback(() => {
                fetchAddress({getUserId, setAddress})
            }, [])
        );
const orderObj ={
    userId:getUserId,
    cartItem:cart,
    totalPrice: total,
    shippingAddress:selectedAddres,
    paymentMethod: selectedPaymentOption
}
const dispatch = useDispatch();
    const handlePayment = ()=> {

    }
    //console.log("Order Object:", orderObj);
    const handleCashPayment = ()=> {
        
        placeOrderByCash({orderObj:orderObj})
        dispatch(emptyCart())
        navigation.navigate('TabsStack', {'screen':'Home'})

    }


    return(
        <SafeAreaView style={st.pageWrapper}>
            <HeaderComponent  pageTitle={screenTitle} goToPrevious={() => navigation.goBack()}/>
                <ScrollView style={st.contentWrapper} showsVerticalScrollIndicator={false}>
                    <View style={st.stepsContainer}>
                        <View style={st.stepsContent}>

                            {steps?.map((step, index)=>(
                                <View key={index}>

                                    {index > 0 && (
                                        <View
                                            style={
                                                [
                                                    {flex:1, height:2, backgroundColor:'green'},
                                                    index <= currentStep && {backgroundColor:'green'}
                                                ]
                                            }
                                        />
                                    )}
                                    <View 
                                    style={[
                                            {width:30, height:30, borderRadius:15, backgroundColor:'#ccc',
                                                justifyContent:'center', alignItems:'center'
                                            },
                                            index <= currentStep && {backgroundColor:'green'}
                                        ]}
                                    >
                                        {index < currentStep? (
                                            <Text style={{fontSize:16, fontWeight:'bold', color:'#fff'}}>&#10003;</Text>
                                        ):(
                                            <Text style={{fontSize:16, fontWeight:'bold', color:'#fff'}}>{index+1}</Text>

                                        )}

                                    </View>
                                    <Text style={{textAlign:'center', marginTop:8}}>{step?.title}</Text>

                                </View>
                            ))}

                        </View>

                    </View>
                    {currentStep == 0 && (
                        <View style={{marginHorizontal:5}}>
                            <View style={{padding:0}}>
                                <Pressable onPress={goToAddress} style={st.addAddressButton}>
                                    <Text style={st.addAddressText}>Add Address</Text>
                                </Pressable>
                            </View>

                            <Text style={{fontSize:18, fontWeight:'bold'}}>Select Delivery Address</Text>
                           
                            
                            <Pressable>
                                {address?.map((ad:UserAddress, index) =>(
                                   <DeliveryAddress key={index} 
                                        getUserId={getUserId}
                                        selectedAddres={selectedAddres}
                                        setSelectedAddress={()=> setSelectedAddress(ad)}
                                        setCurrentStep={()=> setCurrentStep(1)}
                                        index={index}
                                        adres={ad}
                                   />
                                ))}
                            </Pressable>
                            
                            
                            <Pressable>

                            </Pressable>
                        
                        </View>
                    )}
                    {currentStep == 1 && (
                                <View style={{marginHorizontal:20}}>
                                    <Text style={{fontSize:16, fontWeight:'bold'}}>Select Delivery Address</Text>
                                    <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#FFF',
                                        padding:8, gap:7, borderColor:'grey', borderWidth:1, marginTop:10
                                    }}>
                                        {option ? (

                                        <FontAwesome5 name="dot-circle" size={20} color='green'/>
                                        ):(
                                            <Entypo onPress={() => setOption(!option)} name="circle" size={20} color='gray'/>
                                        )}
                                        <Text style={{flex:1}}>
                                            <Text style={{color:'green', fontWeight:'500'}}>Tomorrow by 10PM </Text>
                                            - Free Delivery
                                        </Text>

                                    </View>
                                    <Pressable onPress={()=>setCurrentStep(2)} style={st.optionSelected}>
                                        <Text style={{textAlign:'center', color:'#fff'}}>Continue</Text>
                                    
                                    </Pressable>
                                </View>
                    )}
                    {currentStep == 2 && (
                        <View style={{marginHorizontal:20}}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>Select Your Payment Method</Text>
                            <CashPaymentMethod 
                                selectedPaymentOption={selectedPaymentOption}
                                setSelectedPaymentOption={()=> setSelectedPaymentOption('Cash')}
                            />
                            <CardPaymentMethod 
                                selectedPaymentOption={selectedPaymentOption}
                                setSelectedPaymentOption={() => setSelectedPaymentOption('Card')}
                                handlePayment={handlePayment}                            />
                            <Pressable 
                                onPress={()=> setCurrentStep(3)} style={st.optionSelected}>
                                <Text style={{textAlign:'center', color:'#fff'}}>Continue</Text>
                            </Pressable>
                        </View>
                    )}
                    {currentStep === 3 && selectedPaymentOption === 'Cash' && (
                        <CashPayment 
                            selectedAddress={selectedAddres?.firstName+' '+selectedAddres?.lastName}
                            total={total}
                            cashPayment={handleCashPayment}
                        />
                    )}
                </ScrollView>
        </SafeAreaView>
    )
}

const st = StyleSheet.create({
    pageWrapper:{
        paddingTop: Platform.OS === 'android'?40:0,
        flex:1,
        backgroundColor:'#000'
    },
    contentWrapper:{
        backgroundColor:'#eee',
        marginTop:0
    },
    stepsContainer:{
        flex:1,
        paddingHorizontal:20,
        padding:10,
    },
    stepsContent:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20,
        justifyContent:'space-between'
    },
    addAddressButton:{
        backgroundColor:'#F5F5F5',
        paddingHorizontal:10,
        paddingVertical:6,
        borderRadius:5,
        borderWidth:0.9,
        borderColor:'D0D0D0'
    },
    addAddressText:{
        fontSize:20,
        fontWeight:'bold'
    },
    optionSelected:{
        backgroundColor:'green',
        padding:10,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
        marginBottom:10
    },
})


export default DeliveryScreen;