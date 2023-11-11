import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import Modal from "react-native-modal";
import tw from "twrnc";
import { ButtonApp } from "../components/ButtonApp/ButtonApp";

export const CustomMenu = (props) => {
  const { menuItems, closeMenu, isMenuVisible, translateX, handleLogout,  } = props;
  const handleMenuItemClick = (onPress) => {
    closeMenu();
    if (onPress) {
      onPress();
    }
  };
  const menuStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });


  return (
    <View>
      <Modal transparent visible={isMenuVisible} style={tw`m-0 w-full`}>
        <View
          style={tw`flex-1 bg-opacity-50 bg-black justify-center items-center m-0`}
        >
          <Animated.View
            style={[
              tw`absolute right-0 w-3/7 h-full bg-white border-l border-gray-400 p-4`,
              menuStyle,
            ]}
          >
            {" "}
            <View style={tw`w-full justify-center items-center`}>
              <Image
                style={tw`w-[76px] h-[76px] rounded-[31px] mb-[15px]`}
                resizeMode="cover"
                source={require("../../assets/logo-menu.png")}
              />
            </View>
            <View style={tw`justify-center items-center`}>
            {menuItems.map((menuItem, index) => (
              <TouchableOpacity
                style={tw`py-3  ${
                  index !== menuItems.length - 1 ? "border-b" : ""
                } border-[#2ccec2]`}
                onPress={() => handleMenuItemClick(menuItem.onPress)}
                key={index}
              >
                <Text style={tw`text-center`}>{menuItem.text}</Text>
              </TouchableOpacity>
            ))}
            <View style={tw`py-3`}> </View>
             <ButtonApp
                        size="sm" 
                        bg="green"
                        onPress={closeMenu}
                        text="Fechar Menu"
                    />

              <ButtonApp
                        size="sm" 
                        bg="line"
                        onPress={handleLogout}
                        text="Logout"
                    />
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};
