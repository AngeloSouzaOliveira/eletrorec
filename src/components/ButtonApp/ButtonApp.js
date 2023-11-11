import React, {useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import * as Font from "expo-font";

export const ButtonApp = (props) => {
  const { color, size, bg, text, onPress } = props;
  const styleButton =
    props.size === "lg" ? style.lg : props.size === "sm" ? style.sm : props.size === "md" ?  style.md :  style.md
  const bgStyle =
    props.bg === "light"
      ? style.light
      : props.bg === "green"
      ? style.green
      : props.bg === "line"
      ? style.line
      : style.dark;

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-700': require('../../../assets/fonts/Poppins-Medium.ttf')
      });
    }

    loadFonts();
  }, []);

  return (
    <View>
      <TouchableOpacity
        {...props}
        style={{ ...styleButton, ...bgStyle }}
        onClick={onPress}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  sm: {
    borderRadius: 50,
    width: "100%",
    borderStyle: "none",
    fontFamily: "Poppins-700",
    fontSize: 9,
    paddingTop: 2,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7,
  },
  lg: {
    borderRadius: 50,
    fontFamily: "Poppins-700",
    borderStyle: "solid",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    minWidth: 225,
    minHeight: 10,
  },
  md: {
    borderRadius: 50,
    width: "100%",
    borderStyle: "none",
    fontWeight: "bold",
    fontFamily: "Poppins-700",
    fontSize: 12,
    textTransform: "uppercase",
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  light: {
    backgroundColor: "#f2f6f7",
    color: "#333333",
    fontWeight: '500'
  },
  green: {
    backgroundColor: "#2CCEC2",
    color: "#fff",
    fontWeight: '500'
  },
  dark: {
    backgroundColor: "#333333",
    color: "#fff",
    fontWeight: '500'
  },
  line: {
    backgroundColor: "#c4edea",
    color: "#333333",
    fontWeight: '500'
  },
});

//wExistem outros métodos no navigationobjeto, como:

// navigation.push('RouteName')
// navigation.popToTop()
// navigation.goBack()
