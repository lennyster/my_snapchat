import React from 'react';
import { StyleSheet, TouchableOpacity , Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { color } from 'react-native-reanimated';

export default function Home({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Register')
  }

  const pressHandlerLogin = () => {
    navigation.navigate('Login')
  }
  
  return (
    <View>
      <View style={styles.container}>
        <Image
        style={styles.image}
          source = {{
            uri: 'https://upload.wikimedia.org/wikipedia/fr/archive/a/ad/20190808214536%21Logo-Snapchat.png'}}
        />
      </View>
      <TouchableOpacity style={styles.firstButton} activeOpacity={0.9} onPress={pressHandlerLogin}>
        <View style={styles.buttons}>
            <Text style={{ fontSize: 20, color: "#FFFFFF", fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: "1.6" }}>Log In</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondButton} activeOpacity={0.9} onPress={pressHandler}>
          <View style={styles.buttons}>
              <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: "1.6" }}>Sign Up</Text>
          </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFC00",
    width: "100%",
    height: "76%",
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color:"#ffff"
  },
  image: {
    width: 80,
    height: 80,
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
    width:"100%",
    height:"100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff'
  }
});
