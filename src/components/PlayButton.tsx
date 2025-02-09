import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import CustomIcon from './CustomIcon';
import { COLOR } from '../constants/colors';
import { FONT } from '../constants/fonts';

const PlayButton = ({ onClick }:{ onClick: () => void;} ) => {

    return (
        <View style={styles.container}>
            <Pressable
            android_ripple={{
                color: '#0101014D',
                borderless: true,
            }}
            style={({pressed}) => [
                pressed && Platform.OS === 'ios'
                ? {opacity: 0.5}
                : {},
                styles.button,
            ]}
            onPress={onClick}>
                <CustomIcon name="play" size={24} color={COLOR.background} />
                <Text style={styles.playText}>Play</Text>
            </Pressable>
        </View>
    );

};

export default PlayButton;

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        position: 'absolute',
        bottom: 45,
        overflow: 'hidden',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFFE5',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 40,
    },
    playText: {
        fontSize: 17,
        fontWeight: 700,
        marginLeft: 5,
        color: COLOR.background,
        fontFamily: FONT.inter,
    },
});
