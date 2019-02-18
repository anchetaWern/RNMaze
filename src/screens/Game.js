import React, { PureComponent } from "react";
import { View, Text } from "react-native";

export default class Game extends PureComponent {
  
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Text>Game Screen</Text>
      </View>
    );
  }
  
}