import React from "react";
import { View, Text } from "react-native";

interface displayMessage {
    message?: string;
    visible?:()=> void
}

export const DisplayMessage = ({message, visible}: displayMessage) => {

    return (
        <View
            style={{
                zIndex:9999, backgroundColor:'green', top:8,
                padding:15, position:'absolute', width:'100%', marginTop:15
            }}
        >
            <Text
                style={{
                    fontStyle:'normal', fontSize:13, fontWeight:'bold', color:'#fff', textAlign:'center'
                }}
            >
                {message}
            </Text>

        </View>
    )
}