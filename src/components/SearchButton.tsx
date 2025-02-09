import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import CustomIcon from './CustomIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchButton = ({ onClick }:{ onClick: () => void;} ) => {
    const {top} = useSafeAreaInsets();


    return (
        <View style={[styles.container, {top: top + 20}]}>
            <Pressable
            android_ripple={{
                color: '#FFFFFF4D',
                borderless: true,
            }}
            style={({pressed}) => [
                pressed && Platform.OS === 'ios'
                ? {backgroundColor: '#FFFFFF4D'}
                : {},
                styles.button,
            ]}
            onPress={onClick}>
                <CustomIcon name="search" size={24} color="#FEFEFE" />
            </Pressable>
        </View>
    );

};

export default SearchButton;

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        overflow: 'hidden',
        position: 'absolute',
        left: 20,
        zIndex: 9999,
    },
    button: {
        height: 40,
        width: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
