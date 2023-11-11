import React from "react";
import RemoveIcon from "../Icons/Remove";
import UpdateIcon from "../Icons/UpdateIcon";
import { View, StyleSheet, ImageBackground, TouchableOpacity, } from "react-native";
import { TitleApp } from "../TitleApp/TitleApp";
import tw from "twrnc";
export const CardSingleApp = (props) => {
  const { image, title, children, handleEdit, handleRemove } = props;
  return (
    <View style={tw`flex w-[100%] flex-col bg-white rounded-[31px] mt-2`}>
      <View
        style={tw`shadow-sm bg-white self-stretch flex w-full grow flex-col rounded-[31px] pl-0 `}
      >
        <View
          style={tw`justify-center items-center self-stretch flex flex-col rounded-[31px]`}
        >
          <ImageBackground
            source={{ uri: image }}
            imageStyle={{ borderRadius: 31 }}
            style={tw`bg-zinc-100 self-stretch flex w-full grow flex-col pt-40 rounded-[31px] pl-0`}
          >
            <View style={style.backTitle}>
              <TitleApp align="left" color="#135b55" size="md">
                {title}{" "}
              </TitleApp>
            </View>
          </ImageBackground>
        </View>
        <View
          style={tw`w-[100%] text-black text-xs whitespace-nowrap mt-3.5 self-start max-md:ml-0 px-5`}
        >
          {children}
        </View>

        <View
          style={tw`self-stretch flex items-start justify-between flex-row gap-0 mt-8 max-md:mt-5`}
        >
          <TouchableOpacity
            onPress={handleEdit}
            style={[
              tw`w-[50%]`,
              { backgroundColor: "#aee7e2", borderBottomLeftRadius: "31px" },
            ]}
          >
            <View style={tw` flex flex-col flex-1 px-5 py-4 rounded-bl-[31px]`}>
              <View
                style={tw`text-black text-sm self-center items-center whitespace-nowrap flex flex-row`}
              >
                <UpdateIcon
                  width={25}
                  height={25}
                  color={"#135b55"}
                  style={{ marginTop: "12px" }}
                />
                <TitleApp align="left" color="#135b55" size="smm">
                  Alterar
                </TitleApp>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRemove}
            style={[
              tw`w-[50%]`,
              { backgroundColor: "#CCE5E2", borderBottomRightRadius: "31px" },
            ]}
          >
            <View
              style={tw`flex flex-col flex-1 px-5 py-4 rounded-br-[31px] border-l border-gray-300`}
            >
              <View
                style={tw`text-black text-sm self-center  items-center ml-0 whitespace-nowrap flex flex-row`}
              >
                <RemoveIcon
                  width={25}
                  height={25}
                  color={"#1f978e"}
                  style={{ marginTop: "12px" }}
                />
                <TitleApp align="left" color="#1f978e" size="smm">
                  Remover
                </TitleApp>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
    backTitle: {
        backgroundColor: "#64F9EA",
        width: "100%",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
      },
});
