import { transform } from '@babel/core';
import  React, {useCallback, useEffect, useRef, useState} from 'react';
import { View, StyleSheet, Text, Pressable, Image, ImageBackground, TouchableOpacity, DimensionValue, ScrollView, Dimensions, Animated, Easing, TextInput} from 'react-native';

const width = Dimensions.get('screen').width*2/3+50

interface IUserForm {
    label:string;
    duration?:number;
    labelColor?:string;
    text?:string;
    updateText?:(text:string)=> void
}

export const UserDataForm = ({label, duration, labelColor='balck', text, updateText} : IUserForm) => {
    
    const transY = useRef(new Animated.Value(0)).current;
    const borderWidth = useRef(new Animated.Value(1)).current;

    const transformAnimation = (toValue:number) => {
        Animated.timing(transY, {
            toValue,
            duration,
            useNativeDriver:true,
            easing:Easing.ease
        }).start();
    }
    const animatedBorderWidth = (toValue:number) => {
        Animated.timing(borderWidth, {
            toValue,
            duration,
            useNativeDriver:false,
            easing:Easing.ease
        }).start();
    }

    const onFocusHandler = () => {
        transformAnimation(-13)
        animatedBorderWidth(2)
    }
    const onBlurHandler = () => {
        if(text) return;

        transformAnimation(0)
        animatedBorderWidth(1)
    }
    const borderColor = borderWidth.interpolate({
        inputRange:[1,2],
        outputRange:['black', 'orange'],
        extrapolate:'clamp'
    })
    const labelFontSize = borderWidth.interpolate({
        inputRange:[1,2],
        outputRange:[14, 10],
        extrapolate:'clamp'
    })
    const labelBackgoundColor = borderWidth.interpolate({
        inputRange:[0,2],
        outputRange:['#fff', '#eee'],
        extrapolate:'clamp'
    })
    const labelPadding = borderWidth.interpolate({
        inputRange:[0,2],
        outputRange:[4, 0],
        extrapolate:'clamp'
    })
    const labelColorAnimation = borderWidth.interpolate({
        inputRange:[1,2],
        outputRange:['grey', labelColor],
        extrapolate:'clamp'
    })
    const animStyle = {
        transform:[
            {translateY: transY}
        ]
    }
    
    return(
        <Animated.View style={[st.container, {borderWidth:borderWidth, borderColor:borderColor}]}>
            <Animated.View style={[st.animatedStyle, animStyle]}>
                <Animated.Text style={{color:labelColorAnimation, fontSize:labelFontSize,
                    backgroundColor:labelBackgoundColor, padding:labelPadding
                }}>
                    {label}
                </Animated.Text>
            </Animated.View>
            <TextInput style={[st.input]} 
                value={text}
                onChangeText={updateText}
                editable={true}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                autoCapitalize={'none'}
            />
        </Animated.View>
    )
}

const st = StyleSheet.create({
    container:{
        marginTop:20,
        backgroundColor:'#fff',
        borderRadius:8,
        width:width,
        alignSelf:'center'
    },
    input:{
        fontSize:13,
        height:35,
        color:'#000',
        padding:10
    },
    animatedStyle:{
        top:5,
        left:15,
        position:'absolute',
        borderRadius:90,
        zIndex:10
    },
})

