import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Text, View, TouchableHighlight, Image, Alert, FlatList, ScrollView, YellowBox } from 'react-native';
import { AppLoading } from 'expo';
// import { FormLabel, Button, Image, FormInput, FormValidationMessage } from 'react-native-elements';
import t from 'tcomb-form-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Axios from 'axios';


export default class MySnaps extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            snaps: null,
            u: null
        }
    }

    onSwipeLeft(gestureState) {
        // this.props.navigation.navigate('Send')
        // console.log(2)
    }
     
    onSwipeRight(gestureState) {
        this.props.navigation.navigate('Send')
    }
    
    onSwipe(gestureName, gestureState) {
        const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
          case SWIPE_LEFT:
            this.setState({backgroundColor: 'blue'});
            break;
          case SWIPE_RIGHT:
            this.setState({backgroundColor: 'yellow'});
            break;
        }
    }
    
    componentDidMount(){
        this.getSnaps()
    }

    getSnaps = async () => {
        const val = await AsyncStorage.getItem('token');
        Axios.get('http://snapi.epitech.eu/snaps', {headers: {token: val}}).then(response => 
        {
           this.setState({snaps: response.data.data})
        }).catch((error) => {
            console.log(error)
        })
    }

    pressHandler = async (id, duration, from) => {
        const val = await AsyncStorage.getItem('token');
        const url = 'http://snapi.epitech.eu/snap/'+id
        // Axios.get(url, {headers: {token: val}}).then(response => {
        //     console.log(response)
        // }).catch((error) => {
        //     console.log(error)
        // })
        Axios({
            url: url,
            method: 'GET',
            headers: {token: val},
            responseType: 'blob',
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            this.props.navigation.navigate('DisplaySnap', {image: url, duration: duration, from: from, id: id})
        });
        
    }

    _listEmptyComponent = () => {
        return (
            <View style={{display:"flex", marginTop:"50%", justifyContent:"center", alignItems:"center"}}>
                <Image
                    style={this.styles.image}
                    source = {{
                    uri: 'https://upload.wikimedia.org/wikipedia/fr/archive/a/ad/20190808214536%21Logo-Snapchat.png'}}
                />
                <Text style={{fontWeight:"bold", fontSize:40, textAlign:"center"}}>Vous n'avez pas reçu de snap.</Text>
            </View>
        )
    }
    
    
    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return (
            <View style={{ flex: 1 }}>
            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style={{
                height: "100%"
                }}
            >
            <FlatList
                    data = {this.state.snaps}
                    ListEmptyComponent = {this._listEmptyComponent}
                    renderItem={({ item }) => 
                        <TouchableHighlight onPress={() => this.pressHandler(item.snap_id, item.duration, item.from)} >
                            <View style={this.styles.users}>
                            <Image
                                style={this.styles.image2}
                                source = {{
                                    uri: 'https://mounirdigital.fr/wp-content/uploads/2019/09/Mounir-Digital-348.png'}}
                                />
                            <Text style={this.styles.text}>{item.from}</Text>
                            </View>
                        </TouchableHighlight>
                    }
                />
         </GestureRecognizer>
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