import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, {useState} from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

export interface IGoBack {
    onPress?: () => void;
}

export const GoBack = ({onPress}: IGoBack) => {
    return (
        <Pressable onPress={onPress}>
            <Ionicons name='chevron-back-circle-sharp' size={30} color='#fff' />

        </Pressable>
    )
} 