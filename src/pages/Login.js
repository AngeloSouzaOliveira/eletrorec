import React, { useState } from "react";
import { View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { supabase } from '../../supabase.ts'
import { InputApp } from "../components/InputApp/InputApp";
import { ButtonApp } from "../components/ButtonApp/ButtonApp";
import tw from "twrnc";
export const Login = ({ navigation }) => {
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [messageErro, setMessageErro] = useState("");


  async function signiInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    })

    if(error) { 
      setMessageErro('E-mail errado não é válido.');
    } else {
      // console.log(data)
      navigation.navigate("TabNavigator");
    }
  }

  async function goToCadastro(){ 
    navigation.navigate("Cadastro");
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background-opacity.png")}
        style={styles.backgroudApp}
      >
        <Image
           style={tw`w-[122px] h-[122px]`}
          source={require("../../assets/logo-form.png")}
        />
        <InputApp
          label='E-mail'
          placeholder='email@eletrorec.org.br'
          value={email}
          keyboardType='email-address'
          onChangeText={(text) => setEmail(text)}
        />

        <InputApp
          label='Senha'
          placeholder='**********'
          value={senha}
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text)}
        />
        
        <ButtonApp
          size="lg"
          bg="green"
          onPress={() => signiInWithEmail()}
          text="Login"
        />

        <ButtonApp
          size="lg"
          bg="line"
          onPress={() => goToCadastro()}
          text="Cadastra-se"
        />

        <Text>{messageErro}</Text>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2ccec2",
    alignItems: "center",
    justifyContent: "center",
  },

  backgroudApp: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;



// <TextInput
// style = {styles.input}
// placeholder="Email"
// value={email}
// keyboardType="email-address"
// onChangeText={(text)=>setEmail(text)}
// />
// <TextInput
// style = {styles.input}
// placeholder="Password"
// value={password}
// secureTextEntry={true}
// textContentType="newPassword"
// onChangeText={(text)=>setPassword(text)}
// />