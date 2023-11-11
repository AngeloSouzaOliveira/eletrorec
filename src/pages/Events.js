import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { CardDateApp } from "../components/CardDateApp/CardDateApp";
import * as Font from "expo-font";
import { useSupabase } from "../../SupabaseProvider";
import Modal from "react-native-modal";
import tw from "twrnc";
import { ButtonApp } from "../components/ButtonApp/ButtonApp";
import ButtonCreateApp from "../components/ButtonCreateApp/ButtonCreateApp";

const Events = ({ navigation }) => {
  const [createSuccess, setCreateSuccess] = useState(false);
  const [isModalCreate, setModalCreateVisible] = useState(false);
  const { loadTableEvents, eventsData, createNewEvent } = useSupabase();
  const [eventData, setEventData] = useState({
    titulo: "",
    data: "",
    localizacao: "",
    descricao: "",
    hora: "",
    image: ""
  });


  useEffect(() => {
    async function load() {
      await loadTableEvents();
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

  const handleCardEventPress = (id) => {
    navigation.navigate("SingleEvents", { id });
  };

  async function createEvent() {
    setModalCreateVisible(true);
  }

  async function confirmCreate() {
    try {
      await createNewEvent(eventData);
      setModalCreateVisible(false);
      setCreateSuccess(true);

      setEventData({
        titulo: "",
        data: "",
        localizacao: "",
        descricao: "",
        hora: "",
        image: ""
      });
    } catch (error) {
      console.error("Erro ao criar o evento:", error);
    }
  }

  // Função para agrupar os dados em pares
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
          Junte-se à transformação: escolha com consciência as práticas
          sustentáveis e participe ativamente na preservação do nosso planeta.
        </Text>
        <ButtonCreateApp title='Criar novo evento' handlePress={createEvent}/>
      </View>
      {groupDataInPairs(eventsData).map((pair, index) => (
        <View key={index} style={tw`flex flex-row gap-2 mb-4 justify-between`}>
          {pair.map((event, eventIndex) => (
            <TouchableOpacity
              key={event["id"]}
              style={tw`w-1/2 pr-2`}
            >
              <CardDateApp
                key={eventIndex}
                data={event["data"].split('/')[0]}
                mes={event["data"].split('/')[1]}
                titulo={event["titulo"]}
                localizacao={event["localizacao"]}
                onPress={() => handleCardEventPress(event["id"])}
              />
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View>
        <Modal isVisible={isModalCreate}>
        <View style={tw`flex bg-white p-5 rounded-10 items-center`}>
            <Text><strong>Criar Novo Evento</strong></Text>
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
          />
           <TextInput
            style={tw`block w-full pl-3 border rounded-full border-1 border-slate-400 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 my-2`}
            placeholder="Url da imagem"
            value={eventData.image}
            onChangeText={(text) =>
              setEventData({ ...eventData, image: text })
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

export default Events;
