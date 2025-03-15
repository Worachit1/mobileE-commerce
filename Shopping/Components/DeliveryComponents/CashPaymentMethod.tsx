import React, {} from "react";
import {View, Text, StyleSheet} from 'react-native';
import { FontAwesome5, Entypo } from "@expo/vector-icons";

interface IPaymentProps {
    selectedPaymentOption:string;
    setSelectedPaymentOption:()=>void
}

export const CashPaymentMethod = ({selectedPaymentOption, setSelectedPaymentOption}:IPaymentProps)=>{

    return(
        <View 
            style={{
                backgroundColor:'#fff', padding:8, borderColor:'#D0D0D0', borderWidth:1, flexDirection:'row',
                alignItems:'center', gap:7, marginTop:12    
            }}
        >
            {selectedPaymentOption === 'Cash'?(
                <FontAwesome5 name="dot-circle" size={20} color='gray'/>
            ):(
                <Entypo onPress={setSelectedPaymentOption} name="circle" size={20} color='gray'/>
                                       
            )}
            <Text>Cash on Delivery</Text>
        </View>
    )
}

