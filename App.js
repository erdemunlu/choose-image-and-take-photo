import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Platform, Button, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';



export default function App() {
  const [image,setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const PickImage = async() => {
let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality:1
    })
    console.log(result)
    if(!result.cancelled){
      setImage(result.uri)
    }
}
  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      });
      if (!data.cancelled) {
        setImage(data.uri)
        
      }
    } else {
      Alert.alert('You need to give permissions');
    }
  };



  return (
    <View style={styles.container}>
     <Button title = "Choose Image"onPress={PickImage} />
      <Button title = "Take A Photo"onPress={pickFromCamera} />
      
      
      {image && <Image source = {{uri:image}} style ={{
        width:200,
        height:200
      }}/>}
      {/* <Button title = "Image process"onPress={pickFromCamera} />  */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ffff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
