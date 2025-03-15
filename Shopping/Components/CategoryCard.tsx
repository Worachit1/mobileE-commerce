import  React from 'react';
import { View, StyleSheet, Text, Pressable, Image, ImageBackground, TouchableOpacity, } from 'react-native';

import { ICatProps } from '../Types/CategoryTypes'; 

export const CategoryCard = ({item, catProps, catStyleProps}: ICatProps) => {
    let isActive = item._id == catProps.activeCat;
    let activeButtonclass = isActive?'orange':'#eee'

    return(
        <View>
            {catProps.imageBg !== undefined? (
                <View style={{alignItems:'center'}}>
                    <Pressable style={st.imageContainer} key={item._id} onPress={catProps.onPress}>
                        <ImageBackground source={{uri: catProps?.imageBg}} style={styl(catStyleProps?.imageBgHt).imageBg} 
                        imageStyle={{borderRadius:6,}}>
                            <Image source={{uri: item?.images[0]}} 
                            style={sty(catStyleProps.width, catStyleProps.height, catStyleProps.radius).imgStylesProps}
                            resizeMode={catStyleProps?.resizeMode}
                            />
                        </ImageBackground>

                    </Pressable>
                    <Text style={st.catName}>{item?.name}</Text>
                </View>
            ):( 
                <Pressable style={[st.touchableStyle, {backgroundColor:activeButtonclass}]} key={item._id} onPress={catProps.onPress}>
                    <View style={st.imageContainer}>
                        <Image source={{uri: item?.images[0]}} 
                            style={sty(catStyleProps.width, catStyleProps.height, catStyleProps.radius).imgStylesProps}
                            resizeMode={catStyleProps?.resizeMode}
                        />
                    </View>
                    <Text style={st.catName}>{item.name}</Text>
                </Pressable>
                
            )}
        </View>
    )
}

const st = StyleSheet.create ({
    imageContainer: {
        borderRadius:50,
        padding:3
    },
    catName: {
        fontSize:8,
        fontWeight:'bold'
    },
    touchableStyle: {
        alignItems: 'center',
        padding:5,
        borderRadius:20,
        margin: 3,
    },
})

const styl = (height?:number) => ({
    imageBg: {
        height,
        borderRadius: 18,
    },
})

const sty = (width?:number, height?:number, radius?:number) =>({
    imgStylesProps: {
        width,
        height,
        borderRadius:radius
    }
})

export default CategoryCard;