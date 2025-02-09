import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomIcon from './CustomIcon';

type ActionButtonProps = {
    iconName: string;
    onClick: () => void;
    action?: boolean;
    activeColor: string;
    count?: number | string;
};

const ActionButton = ({
    iconName,
    action = false,
    activeColor,
    count,
    onClick,
}: ActionButtonProps ) => {

    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.content}>
                <CustomIcon name={iconName} size={25} color={action ? activeColor : '#FFFFFFCC'} />
                <Text style={styles.test}>{count}</Text>
            </View>
        </TouchableOpacity>
    );

};

export default ActionButton;

const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    test:{
        fontSize: 12,
        color: '#FFFFFF',
    },
});
