import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import Pusher from "pusher-js/react-native";
import Config from "react-native-config";

const pusher_app_key = Config.PUSHER_APP_KEY;
const pusher_app_cluster = Config.PUSHER_APP_CLUSTER;
const base_url = "YOUR NGROK HTTPS URL";

import dimensions from '../data/constants';
const { width, height } = dimensions;

class LoginScreen extends Component {
  static navigationOptions = {
    title: "Login"
  };

  state = {
    username: "",
    enteredGame: false
  };

  constructor(props) {
    super(props);
    this.pusher = null;
    this.myChannel = null;
    this.opponentChannel = null;
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.main}>
            <View>
              <Text style={styles.label}>Enter your username</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
              />
            </View>

            {!this.state.enteredGame && (
              <TouchableOpacity onPress={this.enterGame}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Login</Text>
                </View>
              </TouchableOpacity>
            )}

            {this.state.enteredGame && (
              <Text style={styles.loadingText}>Loading...</Text>
            )}
          </View>
        </View>
      </View>
    );
  }


  enterGame = async () => {
    const myUsername = this.state.username;

    if (myUsername) {
      this.setState({
        enteredGame: true
      });

      this.pusher = new Pusher(pusher_app_key, {
        authEndpoint: `${base_url}/pusher/auth`,
        cluster: pusher_app_cluster,
        auth: {
          params: { username: myUsername }
        },
        encrypted: true
      });

      this.myChannel = this.pusher.subscribe(`private-user-${myUsername}`);
      this.myChannel.bind("pusher:subscription_error", status => {
        Alert.alert(
          "Error",
          "Subscription error occurred. Please restart the app"
        );
      });

      this.myChannel.bind("pusher:subscription_succeeded", () => {
       
        this.myChannel.bind("opponent-found", data => {
          const opponentUsername =
            myUsername == data.player_one ? data.player_two : data.player_one;

          const isPlayerOne = myUsername == data.player_one ? true : false;
          
          const ballColor = (isPlayerOne) ? 'pink' : 'blue';

          Alert.alert("Opponent found!", `Use the ${ballColor} ball`);

          this.opponentChannel = this.pusher.subscribe(
            `private-user-${opponentUsername}`
          );
          this.opponentChannel.bind("pusher:subscription_error", data => {
            console.log("Error subscribing to opponent's channel: ", data);
          });

          this.opponentChannel.bind("pusher:subscription_succeeded", () => {
            this.props.navigation.navigate("Game", {
              pusher: this.pusher,
              isPlayerOne: isPlayerOne,
              myUsername: myUsername,
              myChannel: this.myChannel,
              opponentUsername: opponentUsername,
              opponentChannel: this.opponentChannel
            });
          });

          this.setState({
            username: "",
            enteredGame: false
          });
        });
      });
    }
  };
}

export default LoginScreen;

const styles = {
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFF"
  },
  fieldContainer: {
    marginTop: 20
  },
  label: {
    fontSize: 16
  },
  textInput: {
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#eaeaea",
    padding: 5
  },
  button: {
    alignSelf: "center",
    marginTop: 10
  },
  buttonText: {
    fontSize: 18,
    color: "#05a5d1"
  },
  loadingText: {
    alignSelf: "center"
  }
};