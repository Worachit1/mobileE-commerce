import React, {useState, useRef} from "react";
import {View, Text, SafeAreaView, ScrollView, Platform, Dimensions, Animated, StyleSheet, Image} from 'react-native';
import { AntDesign, Ionicons, Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useInterval } from "../Hooks/UseInterval";

interface ImageProps {
    images: string[];
}

const Max_Width = Dimensions.get('screen').width;

const ImageSlider = ({images}:ImageProps) => {
const animation = useRef(new Animated.Value(0));
const [currentImage, setCurrentImage ] = useState(0);

const handleAnimation = () => {
    let newCureentImage = currentImage + 1;

    if(newCureentImage >= images.length) {
        newCureentImage = currentImage * 0;
    }

    Animated.spring(animation.current, {
        toValue: -(Dimensions.get('screen').width * newCureentImage),
        useNativeDriver:true,
    }).start();

    setCurrentImage(newCureentImage);
}

useInterval(() => handleAnimation(), 5000)
    return (
        <>
            <View>
                <Animated.View style={[styles.container, {transform:[{translateX:animation.current}]}]}>
                    {
                        images.map(image => (
                            <Image key={image} source={{uri:image}} style={styles.image} />
                        ))
                    }
                    <View style={styles.indicatorContainer}>
                        {
                            images.map((image, index) => (
                                <View key={`${image}_${index}`} 
                                    style={[styles.indicator, index === currentImage? styles.activeIndicator: undefined]}
                                />
                            ))
                        }
                    </View>
                </Animated.View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
        height: 220,
        width: Dimensions.get('screen').width,
        borderWidth: 7,
        borderColor: 'white',

    },

    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Max_Width,
        bottom: 10,
        zIndex: 2,
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 7.5,
        borderColor: 'silver',
        borderWidth: 1,
        marginHorizontal: 3,
        marginBottom: 0,
        backgroundColor: '#eee'
    },
    activeIndicator: {
        backgroundColor: 'orange',
        
    },

})

export default ImageSlider;