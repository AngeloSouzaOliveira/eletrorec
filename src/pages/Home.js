import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";

import { TitleApp } from "../components/TitleApp/TitleApp";
// import { LabelPointApp } from "../components/LabelPointApp/LabelPointApp";
import { CardApp } from "../components/CardApp/CardApp";
import { CardImage } from "../components/CardImage/CardImage";
import { CardDateApp } from "../components/CardDateApp/CardDateApp";
import { supabase } from "../../supabase";
import { useSupabase } from "../../SupabaseProvider";
import tw from "twrnc";
import { CustomMenu } from "../navigation/CustomMenu";
import MenuIcon from "../components/Icons/MenuIcon";
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const Home = ({ navigation }) => {
  const { partnersData, loadAllPartners} = useSupabase();
  const { newsData, loadAllNews } = useSupabase();
  const { eventsData, loadTableEvents } = useSupabase();

  const handleCardPress = (id) => {
    navigation.navigate("SingleNews", { id });
  };

  const handleCardEventPress = (id) => {
    navigation.navigate("SingleEvents", { id });
  };

  const handleCardPartnersPress = (id) => {
    navigation.navigate("SinglePartners", { id });
  };




  useEffect(() => {

    async function load() {
      await loadAllNews();
      await loadTableEvents();
      await loadAllPartners();
    }
    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  const [isMenuVisible, setMenuVisible] = useState(false);
  const translateX = useSharedValue(width);

  const closeMenu = () => {
    translateX.value = withTiming(width, { duration: 300 }, () => {
      setMenuVisible(false);
    });
  };

  const openMenu = () => {
    setMenuVisible(true);
    translateX.value = withTiming(0, { duration: 300 });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erro ao fazer logout:", error);
    } else {
      navigation.navigate("Login");
    }
  };

  const menuItems = [
    {
      text: "Sobre",
      onPress: () => navigation.navigate("Sobre"),
    },
    {
      text: "Contato",
      onPress: () => navigation.navigate("Contato"),
    }
  ];

  return (
    <ScrollView>
    <View style={tw`w-full flex-1 bg-[#f2f2f2] p-5 mt-0`}>
      <TouchableOpacity
        onPress={openMenu}
        style={tw`w-[50px] absolute top-[20px] right-[-10px] h-[50px] z-10`}
      >
        <MenuIcon
          width={35}
          height={35}
          color={"#11514b"}
          style={{ marginTop: "12px" }}
        />
      </TouchableOpacity>

      <CustomMenu
        menuItems={menuItems}
        closeMenu={closeMenu}
        isMenuVisible={isMenuVisible}
        translateX={translateX}
        handleLogout={handleLogout}
      />

      
        <View style={tw`w-full flex-col mt-[5px] mb-[5px]`}>
          <TitleApp align="left" color="#11514b" size="lg">
            Bem-vindo ao Eletro<strong>Rec</strong>! {"\n"}
          </TitleApp>
          <View style={tw`mt-5`}> </View>
          {/* <LabelPointApp coins="20" /> */}
        </View>

        <View style={tw`flex-row mt-[5px]`}>
          <Text style={tw`mb-5 mt-2`}>
            {" "}
            Sugestões de pontos de reciclagem:{" "}
          </Text>
        </View>

        <View style={tw`flex flex-row gap-4  justify-between w-[48%]`}>
        {partnersData.slice(0, 2).map((item) => (
           
            <CardApp
              key={item.id}
              url={item["imagem_url"]}
              title={item["titulo"]}
              location={item["localizacao"]}
              rating={item["avaliacao"]}
              color="#fff"
              onPress={() => handleCardPartnersPress(item["id"])}
            />
            
          ))}
        </View>

        <View style={tw`flex-row  mt-[15px]`}>
          <Text style={tw`mb-5 mt-5`}>
            {" "}
            Conscientize, práticas que ajudam a natureza:{" "}
          </Text>
        </View>

        <View style={tw`flex-row gap-4`}>
          {newsData.slice(0, 2).map((item) => (
            <CardImage
              key={item.id}
              image={item["image"]}
              titulo={item["titulo"]}
              resumo={item["resumo"]}
              onPress={() => handleCardPress(item["id"])}
            />
          ))}
        </View>

        <View style={tw`flex-row mt-[15px]`}>
          <Text  style={tw`mb-5 mt-5`}>
            {" "}
            Faça sua parte, venha participar de eventos:{" "}
          </Text>
        </View>

        <View style={tw`flex flex-row gap-4 justify-between w-[48%]`}>
        {eventsData.slice(0, 2).map((event) => (
            <CardDateApp
              key={event.id}
              data={event["data"].split('/')[0]}
              mes={event["data"].split('/')[1]}
              titulo={event["titulo"]}
              localizacao={event["localizacao"]}
              onPress={() => handleCardEventPress(event["id"])}
            />
          ))}
        </View>
     

      <View style={tw`pb-25`}> </View>
    </View>
    </ScrollView>
  );
};

export default Home;
