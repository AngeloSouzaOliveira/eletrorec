
import { StyleSheet, TextInput, View, Text } from "react-native";
import react, { useState } from "react";
export const InputApp = (props) => {
    const { label, placeholder, value, keyboartype, onChangeText } = props;

    return (
        <View>
            <View style={style.view}>
                {
                    label !== 'false' ? <Text style={style.label}>{label}</Text> : ''
                }
            </View>
            <View style={style.view}>
                <TextInput {...props}
                    placeholder={placeholder}
                    placeholderTextColor='#9DD1CA'
                    value={value}
                    keyboardType={keyboartype}
                    onChangeText={onChangeText}
                    style={[
                        style.input
                      ]}
                >
                </TextInput>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    label: {
        textAlign: 'left',
        paddingBottom: 7,
        color: '#4D4D4D'
    },
    input: {
        backgroundColor: 'transparent',
        width: 230,
        height: '80',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#2CCEC2',
        padding: 7,
        paddingLeft: 13,
        paddingRight: 13,
        marginBottom:16
    }

})


