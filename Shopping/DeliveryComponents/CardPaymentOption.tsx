import React, {} from "react";
import {View, Text, StyleSheet, Alert, Pressable} from 'react-native';
import { FontAwesome5, Entypo } from "@expo/vector-icons";

interface ICardPaymentProps {
    selectedPaymentOption:string;
    setSelectedPaymentOption:()=>void
    handlePayment:()=> void;
   // currentStep?:()=>void;
}

export const CardPaymentMethod = ({
        selectedPaymentOption, setSelectedPaymentOption, handlePayment}:ICardPaymentProps)=>{

    return(
        <View>
            <View 
                style={{
                    backgroundColor:'#fff', padding:8, borderColor:'#D0D0D0', borderWidth:1, flexDirection:'row',
                    alignItems:'center', gap:7, marginTop:12    
                }}
            >
                {selectedPaymentOption === 'Card'?(
                    <FontAwesome5 name="dot-circle" size={20} color='gray'/>
                ):(
                    <Entypo 
                        onPress={()=>{
                            setSelectedPaymentOption()
                            Alert.alert('Pay wtih Debit card', 'Pay Online', [
                                {
                                    text:'Cancel',
                                    onPress:() => console.log('Cancelled')
                                },
                                {
                                    text: 'Proceed',
                                    onPress:() => handlePayment()
                                }
                            ])
                        }} name="circle" size={20} color='gray'
                    />
                                        
                )}
                <Text>Card Payment</Text>
            </View>
        </View>
        
    )
}

const st = StyleSheet.create({
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

