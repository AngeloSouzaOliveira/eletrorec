import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { TitleApp } from "../TitleApp/TitleApp";
import tw from "twrnc";
export const CardDateApp = (props) => {
  const { data, mes, titulo, localizacao, onPress } = props;
  function obterNomeMes(numeroMes) {
    const nomesMeses = [
      "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
    ];
  
    if (numeroMes >= 1 && numeroMes <= 12) {
      return nomesMeses[numeroMes - 1];
    } else {
      console.error("Número de mês inválido:", numeroMes);
      return "000"; 
    }
  }
  return (
    <TouchableOpacity onPress={onPress} style={tw`w-[100%]`}>
      <View style={styles.containerDate}>
        <View style={styles.content}>
          <Text style={styles.dataText}>
            {data}
            {"\n"}
            {obterNomeMes(mes)}
          </Text>
          <View style={styles.title}>
            <TitleApp align="left" color="#000" size="smm">
              {titulo}
            </TitleApp>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#2ccec2",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <Text style={styles.text}>{localizacao}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerDate: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    height: 80,
  },
  content: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    width: "100%",
    paddingTop: 8,
    paddingLeft: 5,
    textAlign: "center",
  },
  text: {
    fontSize: 10,
    textAlign: "left",
    fontWeight: "bold",
    padding: 10,
  },
  dataText: {
    width: 40,
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#11514b",
    justifyContent: "center",
    textAlign: "center",
    borderTopLeftRadius: 15,
    padding: 5,
  },
});
