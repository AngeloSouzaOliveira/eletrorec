// intro.js
import react from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import { TitleApp } from "../components/TitleApp/TitleApp";
import { ButtonApp } from "../components/ButtonApp/ButtonApp";
const IntroPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background-initial.png")}
        style={styles.backgroudApp}
      >
        <TitleApp align='center' textTransform='uppercase' size="lg" color="#fff"  >
          <Text>Ajude a natureza!{'\n'} Doe o seu lixo{'\n'} eletrônico!</Text>
        </TitleApp>

        <Image
          style={styles.logoApp}
          source={require("../../assets/logo-eletrorec.png")}
        />

        <ButtonApp
          size="lg"
          bg="light"
          onPress={() => navigation.navigate("Login")}
          text="Começar Agora"
        />

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2ccec2",
    alignItems: "center",
    justifyContent: "center",
  },
  logoApp: {
    width: 150,
    height: 150,
    marginTop: 30,
    marginBottom: 30,
  },
  backgroudApp: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#2ccec2",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default IntroPage;
