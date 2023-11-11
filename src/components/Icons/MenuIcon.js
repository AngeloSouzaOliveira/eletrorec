import React, { useState, useEffect } from "react";
import { Svg, Path, Rect } from "react-native-svg";

const MenuIcon = ({ width, height, color, style}) => (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        width={width} height={height}
        style={style}
      >
            <Rect width="19" height="2" rx="1" fill={color}/>
            <Rect y="4" width="19" height="2" rx="1" fill={color}/>
            <Rect y="8" width="19" height="2" rx="1" fill={color}/>
            <Rect y="12" width="19" height="2" rx="1" fill={color}/>
      </Svg> 
);

export default MenuIcon;
