import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { CardImage } from "../components/CardImage/CardImage";
import * as Font from "expo-font";
import { useSupabase } from "../../SupabaseProvider";
import ButtonCreateApp from "../components/ButtonCreateApp/ButtonCreateApp";
import Modal from "react-native-modal";
import tw from "twrnc";
import { ButtonApp } from "../components/ButtonApp/ButtonApp";

const GoalPage = ({ navigation }) => {
  const [createSuccess, setCreateSuccess] = useState(false);
  const [isModalCreate, setModalCreateVisible] = useState(false);
  const { newsData, loadAllNews, createNewNews } = useSupabase();
  const [newData, setNewData] = useState({
    titulo: "",
    resumo: "",
    categoria: "",
    conteudo: "",
    image: "",
  });

  useEffect(() => {
    async function load() {
      await loadAllNews();
      await Font.loadAsync({
        "Poppins-700": require("../../assets/fonts/Poppins-Medium.ttf"),
      });
    }
    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   if (createSuccess) {
  //     navigation.goBack();
  //   }
  // }, [createSuccess, navigation]);

  const handleCardPress = (id) => {
    navigation.navigate("SingleNews", { id });
  };

  async function createNews() {
    setModalCreateVisible(true);
  }

  async function confirmCreate() {
    try {
      await createNewNews(newData);
      setModalCreateVisible(false);
      setCreateSuccess(true);

      setNewData({
        titulo: "",
        resumo: "",
        categoria: "",
        conteudo: "",
        image: "",
      });

      navigation.navigate("EletroRec");
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
          Faça a mudança: escolha com responsabilidade o seu centro de
          reciclagem e contribua para a preservação do meio ambiente.
        </Text>
        <ButtonCreateApp
          title="Criar nova publicação"
          handlePress={createNews}
        />
      </View>
      {groupDataInPairs(newsData).map((pair, index) => (
        <View key={index} style={tw`flex flex-row gap-4 mb-4 justify-between`}>
          {pair.map((item) => (
            <CardImage
              key={item.id}
              image={item["image"]}
              titulo={item["titulo"]}
              resumo={item["resumo"]}
              onPress={() => handleCardPress(item["id"])}
            />
          ))}
        </View>
      ))}

      <View>
        <Modal isVisible={isModalCreate}>
          <View style={tw`flex bg-white p-5 rounded-10 items-center`}>
            <Text>
              <strong>Criar Nova Publicação</strong>
            </Text>
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="Título"
              value={newData.titulo}
              onChangeText={(text) => setNewData({ ...newData, titulo: text })}
            />
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="Categoria"
              value={newData.categoria}
              onChangeText={(text) =>
                setNewData({ ...newData, categoria: text })
              }
            />
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="Resumo"
              value={newData.resumo}
              onChangeText={(text) => setNewData({ ...newData, resumo: text })}
            />
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="Conteúdo"
              value={newData.conteudo}
              onChangeText={(text) =>
                setNewData({ ...newData, conteudo: text })
              }
            />
            <TextInput
              style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
              placeholder="Url da Imagem"
              value={newData.image}
              onChangeText={(text) => setNewData({ ...newData, image: text })}
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

export default GoalPage;
