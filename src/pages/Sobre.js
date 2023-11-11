import React from "react";
import { TitleApp } from "../components/TitleApp/TitleApp";
import {
  View,
  Text,
  ScrollView,
  Image
} from "react-native";
import tw from "twrnc";
const Sobre = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={tw`w-full flex-1 bg-f2f2f2 p-[25px]`}>
        <Image style={tw`w-full h-[300px] rounded-[31px] mb-[15px]`} resizeMode="cover" source={ require("../../assets/about.png") }/>
        <TitleApp align='left'
          color={"#11514b"}
          size='md'>
             Sobre o EletroRec
          </TitleApp>
          <Text style={tw` mt-[10px] `}>O EletroRec oferece uma plataforma conveniente para os usuários descartarem seus eletrônicos antigos ou quebrados de maneira responsável. Conectamos os consumidores a locais de reciclagem próximos, onde os dispositivos podem ser reciclados adequadamente e seus componentes valiosos recuperados.</Text>
          <Text style={tw` mt-[10px]`}>Nós ajudando a preservar nosso meio ambiente e a conservar os recursos naturais. Capacitamos e engajamos os consumidores a fazerem a diferença e a contribuírem para um futuro mais limpo e mais verde. Com a crescente conscientização ambiental, esse app de reciclagem de eletrônicos desempenham um papel vital na promoção de um mundo mais sustentável.</Text>
      </View>
    </ScrollView>
  );
};

export default Sobre;
