import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Text, View, TouchableHighlight, Image, Alert, FlatList, ScrollView, YellowBox } from 'react-native';
import { AppLoading } from 'expo';
// import { FormLabel, Button, Image, FormInput, FormValidationMessage } from 'react-native-elements';
import t from 'tcomb-form-native';
import Axios from 'axios';


YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);


export default class All extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            value: this.props.navigation.state.params.uri,
            seconds: this.props.navigation.state.params.seconds
        }
    }

    _retrieveData = async () => {
        try {
          const val = await AsyncStorage.getItem('token');
          if (val !== null) {
            // We have data!!
            this.handleAll(val)
          }
        } catch (error) {
        }
    };


    pressBack = () => {
        this.props.navigation.navigate('Send')
    }

    pressHandler = async (email) => {
        const value = await AsyncStorage.getItem('token');
        let body = new FormData();
        body.append('duration', this.state.seconds);
        body.append('to', email);
        var photo = {
          uri: this.state.value,
          type: 'image/jpeg',
          name: 'photo.jpg',
        };
        body.append('image', photo);
        Axios.post('http://snapi.epitech.eu/snap',body, {headers: {'Content-Type': 'multipart/form-data', 'token' : value}}).then(response => {
            console.log(response)
            if (response.status == 200) {
                Alert.alert("The snap has been send to " + email, "It will be " + this.state.seconds + " seconds long", [{text: 'OK', onPress: this.pressBack}])
            }
        }).catch(error => {console.log(error)})
    }

    componentDidMount()
    {   
        this._retrieveData()
    }

    handleAll = async (token) => 
    {
        Axios.get('http://snapi.epitech.eu/all', {headers: {token: token}}).then(response => 
        {
            this.setState({tab: response.data.data.reverse()})
            // console.log(this.state.tab)
        }).catch((error) => {
            console.log(error)
        })
    }
    

    render()
    {
        return (
            <View>
                <View style={this.styles.container}>
                    <Image
                        style={this.styles.image}
                        source = {{
                            uri: 'https://upload.wikimedia.org/wikipedia/fr/archive/a/ad/20190808214536%21Logo-Snapchat.png'}}
                        />
                        
                    <Text style={this.styles.title}>Send to</Text>
                </View>
                <View style={this.styles.scrollView} showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={this.state.tab}
                        renderItem={({ item }) => 
                            <TouchableHighlight onPress={() => this.pressHandler(item.email)} >
                                <View style={this.styles.users}>
                                <Image
                                    style={this.styles.image2}
                                    source = {{
                                        uri: 'https://mounirdigital.fr/wp-content/uploads/2019/09/Mounir-Digital-348.png'}}
                                    />
                                <Text style={this.styles.text}>{item.email}</Text>
                                </View>
                            </TouchableHighlight>
                    }
                    />
                </View>
            </View>
        );
    }

    styles = StyleSheet.create({
        container: {
            backgroundColor: "#FFFC00",
            width: "100%",
            height: "25%",
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color:"#ffff"
        },
        send:{
            // color:"#ffff"
            height:20,
            width:20,
        },
        scrollView:{

            backgroundColor:"#ffffff",
        },
        users:{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            // paddingVertical: 40,
            paddingHorizontal:30,
            borderBottomWidth:1,
            borderColor:"#e7ebee",
            height:70,
            //borderStyle:"solid",
            // position:"relative",
        },
        title:{
            marginTop:15,
            fontWeight:"bold",
            fontSize:30
        }
        ,
        text:{
            fontWeight:"bold",
            color:"#597a96",
            paddingTop:27,
            fontSize:15,
            fontWeight:"600"
        },
        image: {
          width: 80,
          height: 80,
        },
        image2: {
            width: 40,
            height: 40,
            marginRight:15,
            marginTop:15,
            marginBottom:15
          },
        firstButton:{
          height: "12%",
          width:"100%",
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:"#f23b57",
        },
        secondButton:{
          height: "12%",
          width:"100%",
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:"#0eadff"
        },
        buttons:{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }
    })

}

