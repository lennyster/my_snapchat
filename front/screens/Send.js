import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Text, View, TouchableHighlight, TouchableOpacity, Image, Alert, FlatList, ScrollView  } from 'react-native';
import { AppLoading } from 'expo';
// import { FormLabel, Button, Image, FormInput, FormValidationMessage } from 'react-native-elements';
import t from 'tcomb-form-native';
import Axios from 'axios';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


export default class Send extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            value: null,
            hasPermission: null,
            type: Camera.Constants.Type.back,
            gestureName: 'none',
        }
    }
     
      onSwipeLeft(gestureState) {
        this.props.navigation.navigate('MySnaps')
      }
     
      onSwipeRight(gestureState) {
        this.setState({myText: 'You swiped right!'});
        console.log(this.state.myText)
      }
     
      onSwipe(gestureName, gestureState) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
          case SWIPE_LEFT:
            break;
          case SWIPE_RIGHT:
            break;
        }
      }

    async componentDidMount()
    {   
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }

    handleCameraType= () => {
        const { cameraType } = this.state
    
        this.setState({cameraType:
          cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
        })
    }

    pressHandler = (photo) => {
        this.props.navigation.navigate('Preview', { photo: photo})
    }

    takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          this.pressHandler(photo.uri)
        }
    }

    render()
    {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1  }} type={this.state.cameraType} ref={ref => { this.camera = ref;}}>
                        <GestureRecognizer
                            onSwipe={(direction, state) => this.onSwipe(direction, state)}
                            onSwipeLeft={(state) => this.onSwipeLeft(state)}
                            onSwipeRight={(state) => this.onSwipeRight(state)}
                            config={config}
                            style={{
                            height: "100%"
                            }}
                            >
                        <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                            <TouchableOpacity
                                onPress={this.takePicture}
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',                  
                                }}>
                                <Ionicons
                                    name="ios-camera"
                                    style={{ color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.handleCameraType}
                                style={{
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                }}>
                                <MaterialCommunityIcons
                                    name="camera-switch"
                                    style={{ color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>
                        </View>
                        </GestureRecognizer>
                    </Camera>
                </View>
        );
    }
}