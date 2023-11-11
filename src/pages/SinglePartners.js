import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import * as Font from "expo-font";
import { useSupabase } from "../../SupabaseProvider";
import { useRoute } from "@react-navigation/native";
import { TitleApp } from "../components/TitleApp/TitleApp";
import Modal from "react-native-modal";
import tw from "twrnc";
import { ButtonApp } from "../components/ButtonApp/ButtonApp";
import { CardSingleApp } from "../components/CardSingleApp/CardSingleApp";
import { Rating } from "../components/Rating/Rating";
import PinIcon from "../components/Icons/PinIcon";

const SinglePartners = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;

  const {
    selectByIdPartners,
    partnersData,
    updatePartnersById,
    deletePartnersById,
  } = useSupabase();
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [isModalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [isModalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      await selectByIdPartners(id);
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

  async function removePartners() {
    setModalDeleteVisible(true);
  }
  async function confirmDeletion() {
    try {
      await deletePartnersById(id);
      setDeletionSuccess(true);
    } catch (error) {
      console.error("Erro ao excluir o parceiro:", error);
    }
  }

  async function updantePartners() {
    setModalUpdateVisible(true);
  }

  const partnersDetails = partnersData.find((item) => item.id === id);
  const [newPartners, setNewsPartners] = useState(partnersDetails);
  async function confirmUpdate() {
    try {
      await updatePartnersById(id, newPartners);
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Erro ao atualizar o partners:", error);
    }
  }

  return (
    <ScrollView style={tw`flex-1 bg-[#f2f2f2] p-5 mt-2`}>
      <CardSingleApp
        image={partnersDetails?.imagem_url}
        title={partnersDetails?.titulo}
        handleEdit={updantePartners}
        handleRemove={removePartners}
      >
        <View style={tw`absolute top-[-60px] right-[5px]`}>
          <Rating rating={partnersDetails?.avaliacao} color="#fff" />
        </View>
        <Text style={tw`flex justify-start items-center`}>
          {" "}
          <PinIcon
            width={25}
            height={25}
            color={"#1f978e"}
            style={tw`mt-[12px]`}
          />{" "}
          {partnersDetails?.enderec} - {partnersDetails?.localizacao}
        </Text>

        <Text style={tw`flex justify-start items-center`}>
          <PinIcon
            width={25}
            height={25}
            color={"#1f978e"}
            style={tw`mt-[12px]`}
          />{" "}
          {partnersDetails?.telefone}
        </Text>

        <Text style={tw`flex justify-start items-center`}>
          <PinIcon
            width={25}
            height={25}
            color={"#1f978e"}
            style={tw`mt-[12px]`}
          />{" "}
          {partnersDetails?.resposavel}
        </Text>

        <Text style={tw`flex justify-start items-center`}>
          <PinIcon
            width={25}
            height={25}
            color={"#1f978e"}
            style={tw`mt-[12px]`}
          />{" "}
          {partnersDetails?.site}
        </Text>

        <Text style={tw`flex justify-start items-center`}>
          <PinIcon
            width={25}
            height={25}
            color={"#1f978e"}
            style={tw`mt-[12px]`}
          />{" "}
          {partnersDetails?.email}
        </Text>

        <Text style={tw`flex justify-start items-center`}>
          <PinIcon
            width={25}
            height={25}
            color={"#1f978e"}
            style={tw`mt-[12px]`}
          />{" "}
          {partnersDetails?.cpnj}
        </Text>
      </CardSingleApp>

      <Modal isVisible={isModalDeleteVisible}>
        <View style={tw`flex bg-white p-5 rounded-10 items-center`}>
          <TitleApp align="center" color="#135b55" size="md">
            Deseja realmente excluir o ponto de reciclagem: "
            <strong>{partnersDetails?.titulo}</strong>"?
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
            Atualizar os dados do ponto de reciclagem:
          </TitleApp>
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Título"
            value={newPartners.titulo}
            onChangeText={(text) =>
              setNewsPartners({ ...newPartners, titulo: text })
            }
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Avaliação"
            value={newPartners.avaliacao}
            onChangeText={(text) =>
              setNewsPartners({ ...newPartners, avaliacao: text })
            }
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Hora"
            value={newPartners.localizacao}
            onChangeText={(text) =>
              setNewsPartners({ ...newPartners, localizacao: text })
            }
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Localização"
            value={newPartners.enderec}
            onChangeText={(text) =>
              setNewsPartners({ ...newPartners, enderec: text })
            }
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Localização"
            value={newPartners.telefone}
            onChangeText={(text) =>
              setNewsPartners({ ...newPartners, telefone: text })
            }
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Localização"
            value={newPartners.resposavel}
            onChangeText={(text) =>
              setNewsPartners({ ...newPartners, resposavel: text })
            }
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Localização"
            value={newPartners.site}
            onChangeText={(text) =>
              setNewsPartners({ ...newPartners, site: text })
            }
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Localização"
            value={newPartners.email}
            onChangeText={(text) =>
              setNewsPartners({ ...newPartners, email: text })
            }
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Localização"
            value={newPartners.cpnj}
            onChangeText={(text) =>
              setNewsPartners({ ...newPartners, cpnj: text })
            }
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Url da imagem"
            value={newPartners.imagem_url}
            onChangeText={(text) =>
              setNewsPartners({ ...newPartners, imagem_url: text })
            }
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

export default SinglePartners;
