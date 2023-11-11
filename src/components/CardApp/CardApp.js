import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { TitleApp } from "../TitleApp/TitleApp";
import { Rating } from "../Rating/Rating";
import tw from "twrnc";
export const CardApp = (props) => {
  const { url, title, location, rating, color, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={tw`w-[100%]`}>
      <View style={styles.container}>
        <Image style={styles.imgCard} source={{ uri: url }} />
        <View style={styles.content}>
          <TitleApp {...props} align="left" color={color} size="sm">
            {title}
          </TitleApp>
          <Text style={styles.text}>Local: {location}</Text>
          <Rating rating={rating} color="#fff" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#2CCEC2",
    borderRadius: 15,
    height: 158,
  },
  imgCard: {
    width: "100%",
    height: 100,
    borderRadius: 15,
  },
  content: {
    padding: 10,
  },
  text: {
    fontSize: 10,
    textAlign: "left",
    fontWeight: "bold",
    color: "#0b3531",
  },
});
