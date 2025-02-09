import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FONT } from '../constants/fonts';

type CardProps = {
    title: string;
    cover: ImageSourcePropType;
};

const SmallMovieCard = ({item}:{item: CardProps} ) => {

    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container}>
            <Image source={item.cover} style={styles.cover} />
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </TouchableOpacity>
    );

};

export default SmallMovieCard;

const styles = StyleSheet.create({
    container:{
        width: 116,
        marginHorizontal: 5,
    },
    cover: {
        width: 116,
        height: 155,
        borderRadius: 8,
    },
    title:{
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: FONT.inter,
    },
});
