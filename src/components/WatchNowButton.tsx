import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import CustomIcon from './CustomIcon';
import { COLOR } from '../constants/colors';


const WatchNowButton = ({ onClick }:{ onClick: () => void;} ) => {

    return (
        <View style={styles.container}>
            <Pressable
            android_ripple={{
                color: '#0101014D',
                borderless: true,
            }}
            style={({pressed}) => [
                styles.button,
                pressed && Platform.OS === 'ios'
                ? {opacity: 0.5}
                : {},
            ]}
            onPress={onClick}>
                <CustomIcon name="play" size={18} color="#FFFFFF" />
                <Text style={styles.playText}>Watch Now</Text>
            </Pressable>
        </View>
    );

};

export default WatchNowButton;

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        width: 203,
        overflow: 'hidden',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.primary,
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 20,
    },
    playText: {
        fontSize: 15.1,
        fontWeight: 'bold',
        marginLeft: 5,
        color: '#FFFFFF',
    },
});
