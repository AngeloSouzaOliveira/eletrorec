import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import * as Font from "expo-font";
import { useSupabase } from "../../SupabaseProvider";
import { useRoute } from "@react-navigation/native";
import { TitleApp } from "../components/TitleApp/TitleApp";
import Modal from "react-native-modal";
import tw from "twrnc";
import TimeIcon from "../components/Icons/TimeIcon";
import DataIcon from "../components/Icons/DataIcon";
import PinIcon from "../components/Icons/PinIcon";
import { ButtonApp } from "../components/ButtonApp/ButtonApp";
import { CardSingleApp } from "../components/CardSingleApp/CardSingleApp";

const SingleEvents = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;

  const { selectByIdEvents, deleteEventById, updateEventById, eventsData } =
    useSupabase();
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [isModalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [isModalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      await selectByIdEvents(id);
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

  async function removeEvents() {
    setModalDeleteVisible(true);
  }
  async function confirmDeletion() {
    try {
      await deleteEventById(id);
      setDeletionSuccess(true);
    } catch (error) {
      console.error("Erro ao excluir o evento:", error);
    }
  }

  async function updateEvents() {
    setModalUpdateVisible(true);
  }

  const eventDetails = eventsData.find((x) => x.id === id);

  const [eventData, setEventData] = useState(eventDetails);
  async function confirmUpdate() {
    try {
      await updateEventById(id, eventData);
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Erro ao atualizar o evento:", error);
    }
  }

  return (
    <ScrollView style={tw`flex-1 bg-[#f2f2f2] p-5 mt-2`}>
      <CardSingleApp
        image={eventDetails?.image}
        title={eventDetails?.titulo}
        handleEdit={updateEvents}
        handleRemove={removeEvents}
      >
        <Text style={tw`flex flex-row justify-start items-center`}>
          <DataIcon
            width={25}
            height={25}
            color={"#1f978e"}
            style={tw`mt-[10px]`}
          />{" "}
          <strong style={tw`text-[#1f978e]`}>{eventDetails?.data}</strong>{" "}
          <TimeIcon
            width={25}
            height={25}
            color={"#1f978e"}
            style={tw`mt-[14px] pl-[25px]`}
          />
          <strong style={tw`text-[#1f978e]`}>{eventDetails?.hora} h</strong>
        </Text>
        <Text style={tw`pt-2 flex flex-row justify-start items-center`}>
          {" "}
          <PinIcon
            width={25}
            height={25}
            color={"#1f978e"}
            style={tw`mt-[10px]`}
          />{" "}
          <strong style={tw`text-[#1f978e]`}>
            {eventDetails?.localizacao}
          </strong>
        </Text>

        <Text style={tw`py-2`}>{eventDetails?.descricao}</Text>
      </CardSingleApp>

      <Modal isVisible={isModalDeleteVisible}>
        <View style={tw`flex bg-white p-5 rounded-10 items-center`}>
          <TitleApp align="center" color="#135b55" size="md">
            Deseja realmente excluir o evento "
            <strong>{eventDetails?.titulo}</strong>"?
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
            Atualizar dados do evento
          </TitleApp>
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Título"
            value={eventData.titulo}
            onChangeText={(text) =>
              setEventData({ ...eventData, titulo: text })
            }
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Data"
            value={eventData.data}
            onChangeText={(text) => setEventData({ ...eventData, data: text })}
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Hora"
            value={eventData.hora}
            onChangeText={(text) => setEventData({ ...eventData, hora: text })}
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Localização"
            value={eventData.localizacao}
            onChangeText={(text) =>
              setEventData({ ...eventData, localizacao: text })
            }
          />
          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Descrição"
            value={eventData.descricao}
            onChangeText={(text) =>
              setEventData({ ...eventData, descricao: text })
            }
            multiline
          />

          <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Localização"
            value={eventData.image}
            onChangeText={(text) => setEventData({ ...eventData, image: text })}
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

export default SingleEvents;
