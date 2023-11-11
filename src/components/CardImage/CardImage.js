import React from "react";
import { View, StyleSheet, Image, Text, ImageBackground, Dimensions} from "react-native";
import { TitleApp } from "../TitleApp/TitleApp";
import { ButtonApp } from "../ButtonApp/ButtonApp";
import tw from "twrnc";

export const CardImage = (props) => {
    const {titulo, resumo, image, onPress} = props

    return (
        <View style={styles.container}>

        <ImageBackground
        source={{uri:image}}
        imageStyle={{ borderRadius: 15}}
        style={tw`w-full rounded-[15px] h-[130px] p-[10px] flex-1 items-center justify-center`}
      >
                    <TitleApp  align='center'
                    color='#fff'
                    size='sm'>
                        {titulo}
                    </TitleApp>
                    {/* <Text style={styles.text}>
                        {resumo}
                    </Text> */}
                    <ButtonApp
                        size="sm" style={styles.textButton}
                        bg="line"
                        onPress={onPress}
                        text="ver mais"
                    />
                    {/* <Text style={styles.textButton}>
                    {'\n'}VER MAIS
                    </Text> */}
            </ImageBackground>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        width: '50%',
        height: 130,
        backgroundColor: '#f2f2f2',
        borderRadius: 15
    },
    backgroudImg: { 
        width:'100%',
        borderRadius: 15,
        height: 130,
        padding: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    text:{
        fontSize: 10,
        paddingTop: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        color: "#fff", 
    },
    textButton: { 
        paddingTop: 4,
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: "#fff", 
    }
})