import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export const TitleApp = (props) => {
  const { align, size, color, children } = props;
  
  const styleTitle = props.size == "lg" ? styles.lg : props.size == "md" ? styles.md : props.size == "smm" ? styles.smm : styles.sm;
  const alignText = props.align == 'center' ? styles.textCenter : props.align == 'left' ? styles.textLeft : styles.textRight;
  const textTransform = props.textTransform =='uppercase' ? styles.uppercase : props.textTransform == 'capitalize' ? styles.capitalize : styles.none;

  const { width, height } = Dimensions.get("window");
  const fontSize = Math.min(width, height) * 0.04;
  
  return (
    <Text {...props} style={{ ...styleTitle, ...alignText, ...textTransform, color: color || "#fff" }}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  lg: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  md: {
    fontSize: 18,
    fontFamily: "Arial",
    lineHeight: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  sm: {
    fontSize: 15,
    fontFamily: "Arial",
    lineHeight: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  smm: {
    fontSize: 12,
    fontFamily: "Arial",
    lineHeight: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  textCenter:{
    textAlign: 'center',
  },
  textLeft:{
    textAlign: 'left',
  },
  textRight:{
    textAlign: 'right',
  },
  uppercase: {
    textTransform  : 'uppercase',
  },
  capitalize: {
    textTransform  : 'capitalize',
  },
  none : {
    textTransform : 'none',
  }
});
