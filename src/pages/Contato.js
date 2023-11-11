import React from "react";
import { View, Text, ScrollView, Image} from "react-native";
import { TitleApp } from "../components/TitleApp/TitleApp";
import tw from "twrnc";
const Contato = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={tw`w-full flex-1 bg-f2f2f2 p-[25px]`}>
        <Image
          style={tw`w-full h-[300px] rounded-[31px] mb-[15px]`}
          resizeMode="cover"
          source={require("../../assets/contact.png")}
        />
        <TitleApp align="left" color={"#11514b"} size="md">
          Entre em Contato
        </TitleApp>
        <Text style={tw` mt-[10px] `}>
          Se você tiver alguma dúvida, sugestão ou problema relacionado ao nosso aplicativo, sinta-se à vontade para entrar em contato. Você pode nos enviar um
          e-mail para <strong>eletrorecniteroi@gmail.com</strong>. Estamos disponíveis nos seguintes horários: de{" "} <strong>- segunda a sexta, das 9:00 às 18:00</strong>.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Contato;
