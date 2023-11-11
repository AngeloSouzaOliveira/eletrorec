import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { CardApp } from "../components/CardApp/CardApp";
import * as Font from "expo-font";
import { useSupabase } from "../../SupabaseProvider";
import ButtonCreateApp from "../components/ButtonCreateApp/ButtonCreateApp";
import Modal from "react-native-modal";
import tw from "twrnc";
import { ButtonApp } from "../components/ButtonApp/ButtonApp";

const Guide = ({ navigation }) => {
  const { partnersData, loadAllPartners, createNewPartners  } = useSupabase();
  const [isModalCreate, setModalCreateVisible] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [newsObjPartner, setNewsObjPartner] = useState({
    titulo: "",
    localizacao: "",
    enderec: "",
    telefone: "",
    resposavel: "",
    site: "",
    email: "",
    cpnj: "",
    imagem_url: "",
  });

  useEffect(() => {
    async function load() {
      await loadAllPartners();
      await Font.loadAsync({
        "Poppins-700": require("../../assets/fonts/Poppins-Medium.ttf"),
      });
    }

    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (createSuccess) {
      navigation.goBack();
    }
  }, [createSuccess, navigation]);

  const handleCardPartnersPress = (id) => {
    navigation.navigate("SinglePartners", { id });
  };

  async function createPartners() {
    setModalCreateVisible(true);
  }

  async function confirmCreate() {
    try {
      await createNewPartners(newsObjPartner);
      setModalCreateVisible(false);
      setCreateSuccess(true);
      setNewsObjPartner({
        titulo: "",
        localizacao: "",
        enderec: "",
        telefone: "",
        resposavel: "",
        site: "",
        email: "",
        cpnj: "",
      })
    } catch (error) {
      console.error("Erro ao criar o evento:", error);
    }
  }

  const groupDataInPairs = (data) => {
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = data.slice(i, i + 2);
      pairs.push(pair);
    }
    return pairs;
  };

  return (
    <ScrollView style={tw`flex-1 bg-[#f2f2f2] p-5 mt-5`}>
      <View>
        <Text style={tw`font-Poppins-700 text-base leading-5 pb-5`}>
          Faça a diferença: escolha conscientemente o seu centro de reciclagem e
          ajude a preservar o meio ambiente.
        </Text>
        <ButtonCreateApp
          title="Criar ponto de reciclagem"
          handlePress={createPartners}
        />
      </View>

      {groupDataInPairs(partnersData).map((pair, index) => (
        <View key={index} style={tw`flex flex-row gap-2 mb-4 justify-between`}>
          {pair.map((item, innerIndex) => (
            <TouchableOpacity
              key={item.id}
              style={tw`w-1/2 pr-2`}
            >
              <CardApp
                key={item.id}
                url={item.imagem_url}
                title={item.titulo}
                location={item.localizacao}
                rating={item.avaliacao}
                color="#fff"
                onPress={() => handleCardPartnersPress(item["id"])}
              />
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View>
        <Modal isVisible={isModalCreate}>
        <View style={tw`flex bg-white p-5 rounded-10 items-center`}>
            <Text>
              <strong>Criar Novo Ponto de Reciclagem</strong>
            </Text>
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="Título"
              value={newsObjPartner.titulo}
              onChangeText={(text) =>
                setNewsObjPartner({ ...newsObjPartner, titulo: text })
              }
            />
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="Localização"
              value={newsObjPartner.localizacao}
              onChangeText={(text) =>
                setNewsObjPartner({ ...newsObjPartner, localizacao: text })
              }
            />
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="Endereço"
              value={newsObjPartner.enderec}
              onChangeText={(text) =>
                setNewsObjPartner({ ...newsObjPartner, enderec: text })
              }
            />
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="Telefone"
              value={newsObjPartner.telefone}
              onChangeText={(text) =>
                setNewsObjPartner({ ...newsObjPartner, telefone: text })
              }
            />
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="Responsável"
              value={newsObjPartner.resposavel}
              onChangeText={(text) =>
                setNewsObjPartner({ ...newsObjPartner, resposavel: text })
              }
            />
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="Site"
              value={newsObjPartner.site}
              onChangeText={(text) =>
                setNewsObjPartner({ ...newsObjPartner, site: text })
              }
            />
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="E-mail"
              value={newsObjPartner.email}
              onChangeText={(text) =>
                setNewsObjPartner({ ...newsObjPartner, email: text })
              }
            />
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="CNPJ"
              value={newsObjPartner.cpnj}
              onChangeText={(text) =>
                setNewsObjPartner({ ...newsObjPartner, cpnj: text })
              }
            />
              <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="Url da imagem"
              value={newsObjPartner.imagem_url}
              onChangeText={(text) =>
                setNewsObjPartner({ ...newsObjPartner, imagem_url: text })
              }
            />
            <View
              style={tw`w-full flex f self-center items-center flex-row justify-between mt-2`}
            >
              <ButtonApp
                size="md"
                bg="line"
                onPress={confirmCreate}
                text="Criar"
              />
              <ButtonApp
                size="md"
                bg="light"
                onPress={() => setModalCreateVisible(false)}
                text="Cancelar"
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};


export default Guide;
