import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import * as Font from "expo-font";
import { useSupabase } from "../../SupabaseProvider";
import { useRoute } from "@react-navigation/native";
import { TitleApp } from "../components/TitleApp/TitleApp";
import Modal from "react-native-modal";
import tw from "twrnc";
import { ButtonApp } from "../components/ButtonApp/ButtonApp";
import { CardSingleApp } from "../components/CardSingleApp/CardSingleApp";

const SingleNews = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;

  const { selectByIdNews, deleteNewsById, updateNewsById, newsData } =
    useSupabase();
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [isModalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [isModalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      await selectByIdNews(id);
      await Font.loadAsync({
        "Poppins-700": require("../../assets/fonts/Poppins-Medium.ttf"),
      });
    }
    load();
  }, []);

  useEffect(() => {
    if (deletionSuccess) {
      navigation.goBack();
    }
  }, [deletionSuccess, navigation]);

  useEffect(() => {
    if (updateSuccess) {
      navigation.goBack();
    }
  }, [updateSuccess, navigation]);

  async function removeNews() {
    setModalDeleteVisible(true);
  }

  async function confirmDeletion() {
    try {
      await deleteNewsById(id);
      setDeletionSuccess(true);
    } catch (error) {
      console.error("Erro ao excluir o evento:", error);
    }
  }

  async function updanteNews() {
    setModalUpdateVisible(true);
  }

  const newsDetails = newsData.find((item) => item.id === id);
  const [newData, setNewData] = useState(newsDetails);
  async function confirmUpdate() {
    try {
      await updateNewsById(id, newData);
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Erro ao atualizar o news:", error);
    }
  }
  return (
    <ScrollView style={tw`flex-1 bg-[#f2f2f2] p-5 mt-2`}>
      <CardSingleApp
        image={newsDetails?.image}
        title={newsDetails?.titulo}
        handleEdit={updanteNews}
        handleRemove={removeNews}
      >
        <Text style={tw`flex flex-row justify-start items-center`}>
          <strong
            style={tw`text-white bg-teal-500 rounded-full py-1 px-3 mb-[15px]`}>
            {newsDetails?.categoria}
          </strong>
        </Text>

        <Text style={tw`flex flex-row justify-start items-center`}>
          <strong style={tw`text-[#1f978e]`}>{newsDetails?.resumo}</strong>
        </Text>
        <Text style={tw`py-2`}>{newsDetails?.conteudo}</Text>
      </CardSingleApp>

      <Modal isVisible={isModalDeleteVisible}>
        <View style={tw`flex bg-white p-5 rounded-10 items-center`}>
          <TitleApp align="center" color="#135b55" size="md">
            Deseja realmente excluir a publicação "
            <strong>{newsDetails?.titulo}</strong>"?
          </TitleApp>
          <View
            style={tw`w-full flex f self-center items-center flex-row justify-around mt-3`}
          >
            <ButtonApp
              size="md"
              bg="line"
              onPress={confirmDeletion}
              text="Confirmar"
            />

            <ButtonApp
              size="md"
              bg="light"
              onPress={() => setModalDeleteVisible(false)}
              text="Cancelar"
            />
          </View>
        </View>
      </Modal>

      <Modal isVisible={isModalUpdateVisible}>
        <View style={tw`flex bg-white p-5 rounded-10 items-center`}>
          <TitleApp align="center" color="#135b55" size="md">
            Atualizar publicação:
          </TitleApp>
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
            onChangeText={(text) => setNewData({ ...newData, categoria: text })}
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Resumo"
            value={newData.resumo}
            onChangeText={(text) => setNewData({ ...newData, resumo: text })}
            multiline
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Conteudo"
            value={newData.conteudo}
            onChangeText={(text) => setNewData({ ...newData, conteudo: text })}
            multiline
          />

          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Url da imagem"
            value={newData.image}
            onChangeText={(text) => setNewData({ ...newData, image: text })}
            multiline
          />
          <View
            style={tw`w-full flex f self-center items-center flex-row justify-between mt-2`}
          >
            <ButtonApp
              size="md"
              bg="line"
              onPress={confirmUpdate}
              text="Salvar Alterações"
            />
            <ButtonApp
              size="md"
              bg="light"
              onPress={() => setModalUpdateVisible(false)}
              text="Cancelar"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SingleNews;
