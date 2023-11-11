import React, { useState } from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { supabase } from '../../supabase';
import { InputApp } from "../components/InputApp/InputApp.js";
import { ButtonApp } from "../components/ButtonApp/ButtonApp.js";
import { TitleApp } from "../components/TitleApp/TitleApp";
import Modal from 'react-native-modal';
import tw from "twrnc";
export const Cadastro = ({ navigation }) => {
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [messagecErro, setMessagecErro] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  async function signUpWithEmail() {
    const { error } = await supabase.auth.signUp({
      email: email, 
      password: senha, 
    });
  
    if (error) {
      setMessagecErro("Erro ao criar conta.")
    } else {
      toggleModal();
    }
  }
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background-opacity.png")}
        style={styles.backgroudApp}
      >
        <TitleApp align="center" color="#135b55" size="md">Cadastro</TitleApp>
        <Text style={tw`text-center text-base leading-5 pb-10 px-23 pt-2`}>
          Seja bem-vindo(a)! Estamos animados em tê-lo(a) conosco. Este formulário de cadastro é o primeiro passo para você ajudar o planeta.
        </Text>

        <InputApp
          label='E-mail'
          placeholder='Insira seu e-mail'
          value={email}
          keyboardType='email-address'
          onChangeText={(text) => setEmail(text)}
        />

        <InputApp
          label='Senha'
          placeholder='Insira sua senha'
          value={senha}
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text)}
        />
        
        <ButtonApp
          size="lg"
          bg="green"
          onPress={() => signUpWithEmail()}
          text="Criar Conta"
        />

        <ButtonApp
          size="lg"
          bg="line"
          onPress={() => navigation.navigate("IntroPage")}
          text="Cancelar"
        />

        <Text>{messagecErro}</Text>
        <StatusBar style="auto" />
      </ImageBackground>

      <Modal isVisible={isModalVisible}>
          <View style={tw`flex bg-white p-5 rounded-10 items-center `}>
            <Text style={tw`text-center mb-[24px]`} >Um <strong>e-mail de confirmação foi enviado</strong>. Por favor, verifique sua caixa de entrada.</Text>

            <ButtonApp
                size="md"
                bg="line"
                onPress={() => navigation.navigate("Login")}
                text="   OK   "
              />
            
          </View>
        </Modal>
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

export default Cadastro;

