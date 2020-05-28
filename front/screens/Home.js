import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function Home({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('Register')
  }
  
  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
        source = {{
          uri: 'https://upload.wikimedia.org/wikipedia/fr/archive/a/ad/20190808214536%21Logo-Snapchat.png'}}
      />
      <Button
        large
        onPress={pressHandler}
        title='START' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFC00",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300,
  }
});
