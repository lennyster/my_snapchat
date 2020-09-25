import React, { Component } from "react";
import { StyleSheet, View, Text, Image, AsyncStorage } from "react-native";
import Axios from 'axios'
export default class DisplaySnap extends Component {

    constructor(props){
        super(props)
        this.state = {
            image: this.props.navigation.state.params.image,
            duration: this.props.navigation.state.params.duration,
            from: this.props.navigation.state.params.from, 
            id: this.props.navigation.state.params.id
        }

    }

    delete = async () => {
        const value = await AsyncStorage.getItem('token')
        Axios.post('http://snapi.epitech.eu/seen', {id : this.state.id}, {headers: {'Content-Type': " application/json", 'token' : value}}).then(response => {
                //console.log(response)
                if (response.data.data == "Snap Deleted") {
                    console.log("yes")
                }
                
            }).catch((error) => {
                console.log(error)
        })
    }

    componentDidMount = async () => {
        this.timeoutHandle =  setTimeout( async () =>
        {   
            this.props.navigation.navigate('Send')
            
        },  this.state.duration * 1000);
       this.displaySnap()
       this.delete()

    }

    displaySnap = () => {
        return(
            <Image
            style={this.styles.image}
            source = {{
                uri: this.state.image}}
            />
        )
    }

    render () {
        return(
        <View>
            {this.displaySnap()}
        </View>
        )
        
    }
  

    styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
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
        image: {
            width: "100%",
            height: "100%",
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
