import * as React from "react";
import {View, Image, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
const ContainerButtonCreate = (props) => {
  const {title, handlePress } = props;
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={tw`w-full h-[48px] mb-4`}>
        <View style={tw`h-[89.58%] w-[99.71%] top-[10.42%] right-[0.29%] bottom-[0%] left-[0%] rounded-[29px] bg-[#aee7e2] absolute`} />
        
        <View style={tw`top-0 right-0 w-[43px] h-[48px] absolute`}>
          <View style={tw`ml-[-21.5px] top-1/2 w-[43px] mt-[-24px] h-[48px] absolute top-1/2 left-1/2 absolute transform-translate-1/2-1/2`}>
            <Image
              style={tw`top-1/2 left-1/2 absolute transform-translate-1/2-1/2 mt-[-14px] ml-[-16.5px] w-[33px] h-[33px] mt-[-14px] ml-[-16.5px] w-[33px] h-[33px]`}
              resizeMode="cover"
              source={require("../../../assets/ellipse-1.png")}
            />
            <Image
              style={tw`top-1/2 left-1/2 absolute transform-translate-1/2-1/2 mt-[-19px] h-[43px] ml-[-21.5px] top-1/2 w-[43px] absolute`}
              resizeMode="cover"
              source={require("../../../assets/ellipse-2.png")}
            />
            <Text style={tw`ml-[-15.5px] text-[36px] font-semibold font-inter text-[#f5f5f5] text-center flex items-center justify-center w-[32px] h-[47px] mt-[-24px] top-[46%] left-1/2 absolute transform-translate-1/2-1/2`}>+</Text>
          </View>
        </View>
        <Text style={tw`top-[34%] left-[20px] text-[16px] text-[#000] text-left absolute`}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContainerButtonCreate;
