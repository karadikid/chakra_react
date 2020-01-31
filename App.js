import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Button,
  Platform,
  WebView,
  ScrollView
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    fetch("http://chakra-healer.ommygod.com:8000/conditions")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          data: responseJson.data
        });
        return (
          <ScrollView>
            <Text>
            style={styles.textStyle}
            title="Post Condition"
            color="#FF8976"
            </Text>
          </ScrollView>
        );
      })
      .catch(error => {
        alert(error);
        console.error(error);
      });
  }

  onPostButton() {
    let data = {
      method: "POST",
      body: JSON.stringify({
        condition: this.state.condition,
        primary_chakra: this.state.primary_chakra,
        secondary_chakra: this.state.secondary_chakra,
        tertiary_chakra: this.state.tertiary_chakra
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    this.setState({
      isLoading: true
    });

    return fetch("http://chakra-healer.ommygod.com:8000/conditions", data)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          data: responseJson.data
        });
        alert(JSON.stringify(responseJson));
      })
      .catch(error => {
        alert(error);
        console.error(error);
      });
  }

  onDeleteButton() {
    let data = {
      method: "DELETE",
      body: JSON.stringify({
        id: this.state.id
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    this.setState({
      isLoading: true
    });

    return fetch("http://chakra-healer.ommygod.com:8000/conditions")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          data: responseJson.data
        });
        alert(JSON.stringify(responseJson));
      })
      .catch(error => {
        alert(error);
        console.error(error);
      });
  }

  renderPostButton() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerStyle}>
          <ActivityIndicator size={size || "large"} />
        </View>
      );
    }

    return (
      <Button
        style={styles.buttonStyle}
        onPress={() => this.onPostButton()}
        title="Post Condition"
        color="#FF8976"
      />
    );
  }

  renderDeleteButton() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerStyle}>
          <ActivityIndicator size={size || "large"} />
        </View>
      );
    }

    return (
      <Button
        style={styles.buttonStyle}
        onPress={() => this.onDeleteButton()}
        title="Delete Condition"
        color="#FF8976"
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Condition</Text>
        <TextInput
          style={styles.textStyle}
          onChangeText={text => this.setState({ condition: text })}
          value={this.state.condition}
        />

        <Text style={styles.titleStyle}>Primary Chakra Number</Text>
        <TextInput
          style={styles.textStyle}
          onChangeText={text => this.setState({ primary_chakra: text })}
          value={this.state.primary_chakra}
        />

        <Text style={styles.titleStyle}>Secondary Chakra Number</Text>
        <TextInput
          style={styles.textStyle}
          onChangeText={text => this.setState({ secondary_chakra: text })}
          value={this.state.secondary_chakra}
        />

        <Text style={styles.titleStyle}>Tertiary Chakra Number</Text>
        <TextInput
          style={styles.textStyle}
          onChangeText={text => this.setState({ tertiary_chakra: text })}
          value={this.state.tertiary_chakra}
        />

        <Text style={styles.titleStyle}>{JSON.stringify(this.state.data)}</Text>
        {this.renderPostButton()}
        <Text style={styles.titleStyle}>{JSON.stringify(this.state.data)}</Text>
        {this.renderDeleteButton()}
        <Text style={styles.titleStyle}>Delete Condition Number</Text>
        <TextInput
          style={styles.textStyle}
          onChangeText={text => this.setState({ id: text })}
          value={this.state.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    flexDirection: "column"
  },
  buttonStyle: {
    height: 40,
    width: "40%",
    margin: 10
  },
  textStyle: {
    height: 40,
    width: "40%",
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
    margin: 10
  },
  titleStyle: {
    width: "40%",
    fontSize: 20
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
