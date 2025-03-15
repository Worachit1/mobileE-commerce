import React, {} from "react";
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { FontAwesome5, Entypo, MaterialIcons } from "@expo/vector-icons";

interface ICashProps {
    selectedAddress:string;
    cashPayment:()=>void;
    total:number;
}

export const CashPayment = ({selectedAddress, cashPayment, total}:ICashProps)=>{

    return(
        <View 
            style={{marginHorizontal:20 }}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>Order Now</Text>
            <View
                style={{
                    backgroundColor:'#fff', padding:8, borderColor:'#D0D0D0', borderWidth:1, flexDirection:'row',
                    alignItems:'center',justifyContent:'space-between', gap:7, marginTop:12    
                }}
            >
                <View>
                    <Text style={{fontSize:15, color:'gray', marginTop:5}}>Save 5% and never run out</Text>
                    <Text style={{fontSize:15, color:'gray', marginTop:5}}>Turn on auto Delivery</Text>
                </View>
                <MaterialIcons name='keyboard-arrow-right' size={24} color='#00' />

            </View>

            <View
                style={{
                    backgroundColor:'#fff', padding:8, borderColor:'#D0D0D0', borderWidth:1, marginTop:12    
                }}
            >
                <Text>Shipping to {selectedAddress}</Text>
                <View
                    style={{
                        flexDirection:'row',alignItems:'center',justifyContent:'space-between', marginTop:12    
                    }}
                > 
                    <Text style={{fontSize:15, color:'gray', fontWeight:'bold'}}>Items</Text>
                    <Text style={{fontSize:15, color:'gray', fontWeight:'bold'}}>{total}</Text>
                </View>
                
                <View
                    style={{
                        flexDirection:'row',alignItems:'center',justifyContent:'space-between', marginTop:12    
                    }}
                > 
                    <Text style={{fontSize:15, color:'gray', fontWeight:'500'}}>Delivery</Text>
                    <Text style={{fontSize:15, color:'gray'}}>{"\u0E3F"} 0</Text>
                </View>

                <View
                    style={{
                        flexDirection:'row',alignItems:'center',justifyContent:'space-between', marginTop:12    
                    }}
                > 
                    <Text style={{fontSize:15, color:'gray', fontWeight:'500'}}>Order Total</Text>
                    <Text style={{fontSize:15, color:'gray', fontWeight:'bold'}}>{"\u0E3F"} {total}</Text>
                </View>
            </View>

            <View
                style={{
                    backgroundColor:'#fff', padding:8, borderColor:'#D0D0D0', borderWidth:1,marginTop:12     
                }}
            > 
                <Text style={{fontSize:15, color:'gray'}}>Pay With</Text>
                <Text style={{fontSize:15, color:'gray', fontWeight:'600'}}>Pay on Delivery</Text>
            </View>
            <Pressable 
                onPress={cashPayment} style={st.optionSelected}>
                <Text style={{textAlign:'center', color:'#fff'}}>Place Your Order</Text>
            </Pressable>

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
        marginTop:20,
        marginBottom:10
    },
})