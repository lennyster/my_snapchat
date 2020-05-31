import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Text, View, TouchableHighlight, Image, TextInput, ImageBackground,Picker, Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
// import { FormLabel, Button, Image, FormInput, FormValidationMessage } from 'react-native-elements';
import t from 'tcomb-form-native';
import Axios from 'axios';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import {YellowBox} from 'react-native';


export default class Preview extends Component {

    constructor(props)
    {
        super(props)
        this.state = 
        {
            seconds: "10",
            dialogVisible: false,
        }
    }


    showDialog = () => {
        this.setState({ dialogVisible: true });
    }

    handleCancel = () => {
        this.setState({ dialogVisible: false });
      };
     
    handleOkay = () => {
        this.setState({ dialogVisible: false });
      };

    goForward = (uri, seconds) => {
        this.props.navigation.navigate('All', {uri: uri, seconds: seconds})
    }

    goBack = () => {
        this.props.navigation.navigate('Send')
    }

    onChangeSeconds = (seconds) => {
        this.setState({seconds: seconds})
    }

    render(){
        return (
            <View style={{ flex: 1  }}>
                <ImageBackground
                style={{ flex: 1  }}
                  source = {{
                    uri: this.props.navigation.state.params.photo}}
                >
                <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                        <TouchableOpacity
                            onPress={() => this.goForward(this.props.navigation.state.params.photo, this.state.seconds)}
                            style={{
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',                  
                            }}>
                            <MaterialCommunityIcons
                                name="check-circle"
                                style={{ color: "#fff", fontSize: 40}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.showDialog}
                            style={{
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',                  
                            }}>
                            <MaterialCommunityIcons
                                name="camera-timer"
                                style={{ color: "#fff", fontSize: 40}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            //onPress={Alert.alert("How many seconds ?", "Choose.")}
                            onPress={this.goBack}
                            style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            }}>
                            <MaterialCommunityIcons
                                name="close-circle"
                                style={{ color: "#fff", fontSize: 40}}
                            />
                        </TouchableOpacity>
                        <Dialog.Container visible={this.state.dialogVisible}>
                            <Dialog.Title>How many seconds ?</Dialog.Title>
                            <Picker selectedValue={this.state.seconds} onValueChange={(itemValue, itemIndex) => this.onChangeSeconds(itemValue)}>
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5" value="5" />
                                <Picker.Item label="6" value="6" />
                                <Picker.Item label="7" value="7" />
                                <Picker.Item label="8" value="8" />
                                <Picker.Item label="9" value="9" />
                                <Picker.Item label="10" value="10" />
                            </Picker>
                            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                            <Dialog.Button label="Okay" onPress={this.handleOkay} />
                        </Dialog.Container>
                    </View>
                </ImageBackground>
            </View>
        ) 
    }

    styles = StyleSheet.create({
        container: {
          backgroundColor: "#FFFC00",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color:"#ffff"
        },
        image: {
          width: "100%",
          height: "100%",
        }
    })
    
}