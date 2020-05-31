import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Text, View, TouchableHighlight, Image, Alert  } from 'react-native';
import { AppLoading } from 'expo';
// import { FormLabel, Button, Image, FormInput, FormValidationMessage } from 'react-native-elements';
import t from 'tcomb-form-native';
import Axios from 'axios';



const Form = t.form.Form;

const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return reg.test(email);
});

const User = t.struct({
  email: Email,
  password: t.String,
});

var options = {
    fields: {
      password: {
        password: true,
        secureTextEntry: true
      }
    }
  };

const pressHandler = () => {
    navigation.navigate('Login')
}

export default class Login extends Component{

    constructor(props){
        super(props)
        this.state = {
            form: null,
            value: null
        }
    }

    pressHandler = () => {
        this.props.navigation.navigate('Send')
    }

    onLoginSuccess = () => {
        Alert.alert("You are now logged in!", "Vous allez être redirigé", [{text: 'OK', onPress: () => this.pressHandler()}])
        this._retrieveData()
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    handleSubmit = async () => {
        const value = this.refs.form.getValue(); // use that ref to get the form value
        if (value) {
            var email = this.state.value.email
            var password = this.state.value.password
            Axios.post('http://snapi.epitech.eu/connection', this.state.value).then(response => {
                    //console.log(response)
                    //console.log(response.data.data.token)
                    try {
                        AsyncStorage.setItem(
                          'token',
                          response.data.data.token
                        );
                        AsyncStorage.setItem(
                            'email',
                            response.data.data.email
                          );
                      } catch (error) {
                        // Error saving data
                      }
                    if (response.status == 200) {
                        this.onLoginSuccess()
                    }

                }).catch(error => {
                    console.log(error)
            })
        }
    }

    onChange = (value) => {
        this.setState({value});
    }

      
      render (){
        return (
            <View style={this.styles.container}>
            <View style={{paddingVertical: 60, display:"flex", alignItems:"center"}}>
                <Image
                    style={this.styles.image}
                    source = {{
                    uri: 'https://upload.wikimedia.org/wikipedia/fr/archive/a/ad/20190808214536%21Logo-Snapchat.png'}}
                />
                <Text style={{fontWeight:"bold", fontSize:30, color: "#f23b57"}}>Login</Text>
            </View>
            <View>
                <Form 
                    style={this.styles.form}
                    ref="form"
                    type={User} 
                    options={options}
                    onChange={this.onChange}
                    value={this.state.value}
                />
                <View style={{paddingVertical: 15, paddingHorizontal:50,  display:"flex", alignItems:"center"}}>
                    <TouchableHighlight style={this.styles.button} onPress={this.handleSubmit}>
                        <Text style={this.styles.buttonText}>Sign Up!</Text>
                    </TouchableHighlight>
                </View>
            </View>
            </View>
        );
    }

    styles = StyleSheet.create({
        container: {
          height: "100%",
          backgroundColor: '#fff',
          padding: 20,
          justifyContent: 'center',
          display:"flex",
        },
        
        form: {
            width:"100%"
        },
        image: {
            width: 50,
            height: 50,
            marginBottom: 10
        },
        buttonText: {
          fontSize: 18,
          color: 'white',
          alignSelf: 'center',
          fontWeight:"bold"
        },
        button: {
          height: 45,
          width: "100%",
          backgroundColor: "#f23b57",
          marginBottom: 10,
          borderRadius: 50, 
          display:"flex",
          alignItems:"center",
          alignContent:"center",
        //   alignSelf: 'stretch',
          justifyContent: 'center',
          
        }
      });

}
