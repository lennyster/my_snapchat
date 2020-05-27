import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
        source = {{
          uri: 'https://upload.wikimedia.org/wikipedia/fr/archive/a/ad/20190808214536%21Logo-Snapchat.png'}}
      />
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
