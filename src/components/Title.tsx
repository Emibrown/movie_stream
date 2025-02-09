import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomIcon from './CustomIcon';
import { FONT } from '../constants/fonts';

const Title = ({name}:{name: string} ) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
            <CustomIcon name="chevron-right" size={26} color={'#FFFFFF'} />
        </View>
    );

};

export default Title;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    text:{
        color: '#FFFFFF',
        fontSize: 21,
        fontWeight: '600',
        justifyContent: 'center',
        paddingBottom: 5,
        fontFamily: FONT.inter,
    },
});
