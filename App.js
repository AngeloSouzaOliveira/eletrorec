import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroPage from "./src/pages/IntroPage";
import Login from "./src/pages/Login";
import Cadastro from "./src/pages/Cadastro";
import TabNavigator from "./src/navigation/TabNavigator";
import { NativeWindStyleSheet } from "nativewind";
export default function App() {
  
  const Stack = createNativeStackNavigator();
  NativeWindStyleSheet.setOutput({
    default: "native",
  });
  return (
    <NavigationContainer style={styles.transparent}>
      <Stack.Navigator>
        <Stack.Screen
          name="IntroPage"
          component={IntroPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  transparent: {
    background: "#157d75",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
