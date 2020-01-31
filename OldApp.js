import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

let baseUrl = "http://chakra-healer.ommygod.com:8000";

export default function App() {
  const [conditionTitle, setConditionTitle] = useState([]);
  const [primaryChakra, setPrimaryChakra] = useState([]);
  const [secondaryChakra, setSecondaryChakra] = useState([]);
  const [tertiaryChakra, setTertiaryChakra] = useState([]);

    getConditions() {
        let url = baseUrl + "/conditions";

        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'same-origin'
        }).then((response) => {
            if (response.status === 403) {
                console.log('Authentication error...');
                this.setState({currentMessage: 'Authentication error.'});
            }
            return response.json();
        }).then((responseJson) => {
            console.log(responseJson);
            return responseJson;
        }).catch((error) => {
            console.log(error);
            throw(error);
        });
    }

  return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Enter Username:</Text>
                <TextInput
                    onChangeText={(text) => this.setState({currentUsername: text})}>
                    {this.state.currentUsername}
                </TextInput>
                <Text>Enter Password:</Text>
                <TextInput
                    onChangeText={(text) => this.setState({password: text})}>
                    {this.state.password}
                </TextInput>
                <Button onPress={this.login} title="Login"/>
                <Text>{this.state.currentMessage}</Text>
                <Button onPress={this.logout} title="Logout"/>
            </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


    // {
    //     "condition": "Fibromyalgia",
    //     "primary_chakra": 5,
    //     "secondary_chakra": 4,
    //     "tertiary_chakra": 3
    // }