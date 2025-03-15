import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Platform, Pressable, Alert,StyleSheet} from "react-native";
import axios from "axios";
import { UserAddress } from "../../Types/DeliveryProps";
import { AntDesign, Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { OrderInfo } from "./OrderInfo";



interface IDeliveryAddressProps {
    getUserId:string|null;
    selectedAddres:UserAddress;
    setSelectedAddress:()=>void;
    setCurrentStep:()=>void;
    index:number;
    adres:UserAddress;
}



export const DeliveryAddress = ({selectedAddres, setSelectedAddress, getUserId, setCurrentStep, index,
    adres}:IDeliveryAddressProps) => {

        return(
            <>
                <View key={index} style={st.addressBox}>
                    <Pressable style={st.selectRadio}>
                        {selectedAddres && selectedAddres._id === adres?._id ? (
                            <FontAwesome5 name="dot-circle" size={20} color='gray'/>
                        ):(
                            <Entypo onPress={setSelectedAddress} name="circle" size={20} color='gray'/>
                        )}
                        <OrderInfo 
                            key={index}
                            addressInfo={adres}
                            getUserId={getUserId}

                        />
                    </Pressable>

                    {selectedAddres && selectedAddres._id === adres?._id && (
                        <Pressable onPress={setCurrentStep} style={st.selectedAddress}>
                            <Text style={{textAlign:'center', color:'#fff'}}>Delivery To This Address</Text>

                        </Pressable>
                    )}

                </View>
            </>
        )

}

const st = StyleSheet.create({
    addressBox:{
        borderWidth:1,
        borderColor:'#D0D0D0',
        padding:10,
        gap:0,
        paddingBottom:5,
        marginVertical:7,
        borderRadius:6
    },
    selectRadio:{
        padding:10,
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        paddingBottom:17,
        marginVertical:7,
        borderRadius:6,
        marginLeft:30
    },
    selectedAddress:{
        backgroundColor:'green',
        padding:10,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginTop:2,
        marginBottom:10
    },
})