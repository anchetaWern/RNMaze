import React from "react";
import { View } from "react-native";

import dimensions from '../data/constants';
const { width, height } = dimensions;

const BODY_DIAMETER = Math.floor(width * .02);
const BORDER_WIDTH = 2;

const Circle = ({ body, bgColor, borderColor }) => {
  const { position } = body;

  const x = position.x;
  const y = position.y;
  return <View style={[styles.head, {
    left: x, 
    top: y,
    backgroundColor: bgColor,
    borderColor: borderColor
  }]} />;

};

export default Circle;

const styles = {
  head: {
    borderWidth: BORDER_WIDTH,
    width: BODY_DIAMETER,
    height: BODY_DIAMETER,
    position: "absolute",
    borderRadius: BODY_DIAMETER * 2
  }
};