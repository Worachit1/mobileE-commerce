import React, { } from "react";
import { View, Text, SafeAreaView, ScrollView, Platform, Pressable, Alert,StyleSheet} from "react-native";
import { UserAddress } from "../../Types/DeliveryProps";
import {Entypo} from "@expo/vector-icons";


export interface IOrderInfoProps {
    getUserId?:string|null;
    addressInfo: UserAddress;
    setSelectedAddress?:()=>void;
    onPress?:()=>void;
}

export const OrderInfo = ({addressInfo, setSelectedAddress, getUserId, onPress}:IOrderInfoProps) => {

    return(
        <View>
            <Pressable 
                style={{
                    borderWidth:1, borderColor:'#D0D0D0', padding:10, flexDirection:'row',
                    alignItems:'center', gap:5, paddingTop:17, marginVertical:7, borderRadius:6 ,marginLeft:25
                }}
            >
                <View>
                    <View style={{flexDirection:'row', alignItems:'center', gap:3}}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>
                            {addressInfo?.firstName+' '+addressInfo?.lastName}
                        </Text>
                        <Entypo name="location-pin" size={24} coclor='red' />
                    </View>
                        
                        <Text style={{fontSize:20, color:'#181818'}}>
                            {addressInfo?.region+' '+addressInfo?.city}
                        </Text>
                        
                        <Text style={{fontSize:20, color:'#181818'}}>
                            {addressInfo?.deliveryInfo}
                        </Text>

                        <Text style={{fontSize:20, color:'#181818'}}>
                            Moboile: {addressInfo?.mobileNo}
                        </Text>
                        <View style={{flexDirection:'row', alignItems:'center', marginTop:7}}>
                            <Pressable onPress={onPress} style={{backgroundColor:'#F5F5F5', paddingHorizontal:10,
                                paddingVertical:6, borderWidth:0.9, borderRadius:5, borderColor:'#D0D0D0'}}>
                            <Text>Edit</Text>
                            </Pressable>
                            
                            <Pressable onPress={onPress} style={{backgroundColor:'#F5F5F5', paddingHorizontal:10,
                                paddingVertical:6, borderWidth:0.9, borderRadius:5, borderColor:'#D0D0D0',marginLeft:20}}>
                            <Text>Remove</Text>
                            </Pressable>
                            
                            <Pressable onPress={onPress} style={{backgroundColor:'#F5F5F5', paddingHorizontal:10,
                                paddingVertical:6, borderWidth:0.9, borderRadius:5, borderColor:'#D0D0D0',marginLeft:20}}>
                            <Text>set Default</Text>
                            </Pressable>

                        </View>
                </View>
            
            </Pressable>
        </View>
    )
}