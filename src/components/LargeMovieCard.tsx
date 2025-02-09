import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONT } from '../constants/fonts';

type CardProps = {
    title: string;
    tag: string;
    cover: ImageSourcePropType;
};

const LargeMovieCard = ({item}:{item: CardProps} ) => {

    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container}>
            <Image source={item.cover} style={styles.cover} />
            <View style={styles.tags}>
                <Text style={styles.tagText}>{item.tag}</Text>
                <Text style={styles.text}>DRAMA</Text>
            </View>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </TouchableOpacity>
    );

};

export default LargeMovieCard;

const styles = StyleSheet.create({
    container:{
        width: 146,
        marginHorizontal: 5,
    },
    cover: {
        width: 146,
        height: 220,
        borderRadius: 8,
    },
    tags:{
        flexDirection: 'row',
        gap: 5,
        paddingTop: 5,
    },
    tagText:{
        color: '#FFFFFF99',
        fontSize: 11,
        fontWeight: '400',
        fontFamily: FONT.inter,
    },
    text:{
        color: '#FFFFFF99',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: FONT.inter,
    },
    title:{
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: FONT.inter,
    },
});
