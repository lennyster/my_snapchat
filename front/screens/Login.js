import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Text, View, TouchableHighlight  } from 'react-native';
import { AppLoading } from 'expo';
import { FormLabel, Button, Image, FormInput, FormValidationMessage } from 'react-native-elements';
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
        this.props.navigation.navigate('Register')
    }

    handleSubmit = async () => {
        const value = this.refs.form.getValue(); // use that ref to get the form value
        if (value) {
            var email = this.state.value.email
            var password = this.state.value.password
            Axios.post('http://snapi.epitech.eu/connection', this.state.value).then(response => {
                    console.log(response)
                    token = response.data.data.token
                    try {
                        AsyncStorage.setItem(
                          'token',
                          token
                        );
                      } catch (error) {
                        // Error saving data
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
                <Form 
                    style={this.styles.form}
                    ref="form"
                    type={User} 
                    options={options}
                    onChange={this.onChange}
                    value={this.state.value}
                />
                <TouchableHighlight style={this.styles.button} onPress={this.handleSubmit}>
                    <Text style={this.styles.buttonText}>Sign Up!</Text>
                </TouchableHighlight>
                <TouchableHighlight style={this.styles.button} onPress={this.pressHandler} >
                    <Text style={this.styles.buttonText}>Register !</Text>
                </TouchableHighlight>
            </View>
        );
    }

    styles = StyleSheet.create({
        container: {
          height: "100%",
          backgroundColor: '#fff',
          padding: 20,
          justifyContent: 'center',
        },
        
        form: {
            width:"100%"
        },
        buttonText: {
          fontSize: 18,
          color: 'white',
          alignSelf: 'center'
        },
        button: {
          height: 45,
          backgroundColor: '#000000',
          marginBottom: 10,
          alignSelf: 'stretch',
          justifyContent: 'center'
        }
      });

}
