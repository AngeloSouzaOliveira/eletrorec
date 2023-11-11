import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const LabelPointApp = (props) => {
    const { coins } = props;
    return (
        <View {...props} style={style.container}>
            <Text style={style.textLabel}>Suas moedas EletroRec: </Text> 
            <Text  style={style.valueCoins}>{props.coins}</Text>
        </View>
    )
} 

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        backgroundColor: '#2ccec2',
        borderRadius:  20,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 10,
        marginBottom: 15,
        marginTop: 10,
    },
    textLabel: {
        color: "#000",
        fontSize: '16',
        fontWeight: '500'
    },
    valueCoins : { 
        color: '#fff',
        fontSize: 18,
        backgroundColor: '#18837a',
        borderRadius: 50,
        padding: 10,
        position: 'absolute',
        minWidth: 42,
        flex: 1,
        justifyContent: 'center',
        top: -5,
        right: 0,
        textAlign: 'center'
    }
})