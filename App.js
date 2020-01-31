import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, ActivityIndicator, Button, Platform, WebView } from 'react-native';

const { height, width } = require("Dimensions").get("window");

export default class App extends Component {
    constructor(props) {
        super(props);
            this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
    }

    onPressButton() {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                job: this.state.job
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        this.setState({
            isLoading: true
        })

        return fetch('https://reqres.in/api/users', data)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        data: responseJson.data,
                    });
                    alert(JSON.stringify(responseJson));
                })
                .catch((error) => {
                    alert(error);
                    console.error(error);
                });
    }

    renderButton() {
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
                onPress={() => this.onPressButton()}
                title="Post API"
                color="#FF8976"
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.titleStyle}>Name</Text>
                <TextInput
                    style={styles.textStyle}
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                />

                <Text style={styles.titleStyle}>Job</Text>
                <TextInput
                    style={styles.textStyle}
                    onChangeText={(text) => this.setState({ job: text })}
                    value={this.state.job}
                />

                <Text style={styles.titleStyle}>
                    {JSON.stringify(this.state.data)}
                </Text>

                {this.renderButton()}

                </View>
        );
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 60,
            alignItems: 'center',
            flexDirection: "column",
        },
        buttonStyle: {
            height: 40,
            width: width - 20,
            margin: 10
        },
        textStyle: {
            height: 40,
            width: width - 20,
            borderColor: 'gray',
            borderWidth: 1,
            fontSize: 20,
            margin: 10,
        },
        titleStyle: {
            width: width - 20,
            fontSize: 20,
        },
        spinnerStyle: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    });