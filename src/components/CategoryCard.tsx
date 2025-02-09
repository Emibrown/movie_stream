import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FONT } from '../constants/fonts';

type CardProps = {
    title: string;
    topColor: string;
    bottomColor: string;
};

const CategoryCard = ({item}:{item: CardProps;} ) => {

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
            <LinearGradient colors={[item.topColor,item.bottomColor]} style={styles.container}>
                <Text style={styles.text}>{item.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

};

export default CategoryCard;

const styles = StyleSheet.create({
    container:{
        width: 146,
        height: 80,
        borderRadius: 8,
        justifyContent: 'flex-end',
        marginHorizontal: 5,
    },
    text:{
        color: '#FFFFFF',
        fontSize: 21,
        fontWeight: '600',
        padding: 12,
        fontFamily: FONT.inter,
    },
});
