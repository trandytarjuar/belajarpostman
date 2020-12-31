import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  Image,
  Alert,
  StyleSheet
} from "react-native";
import axios from "axios";
import qs from "qs";
import AppConfig from "../../constant"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
  title: 'select a photo',
  chooseFromLibraryButtonTitle:'choose photo',
  mediaType: 'photo',
  // includeBase64: true,
  quality: 1
}

const EditData = ({ route, navigation }) => {
  const [id, setId] = useState("")
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [imagePicture, setimagePicture] = useState(`${AppConfig.BASE_URL}backend_CRUD_ReactNative/uploads/${itemImage}`);
  const { itemId, itemNama, itemAlamat, itemJurusan, itemImage } = route.params;
  const [users, setUsers] = useState([]);
  console.log("route",route.params)
  const update  =() => {
    const data = new FormData();
    data.append('id', itemId)
    data.append('nama', nama);
    data.append('alamat', alamat);
    data.append('jurusan', jurusan);
    data.append('image', imagePicture);
    
    axios.post(AppConfig.BASE_URL+"backend_CRUD_ReactNative/api/mahasiswas/update", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
            .then(function (response) {
              alert(JSON.stringify(response))
              navigation.navigate("Tambah Data");
            })
            .catch(function (error) {
              alert(error)
              console.log(error);
            });
}

  useEffect(() => {
    getData();
},[]);

const getData = () => {
  axios.get(`${AppConfig.BASE_URL}backend_CRUD_ReactNative/api/mahasiswas/getId/${itemId}`)
  .then(res => {
      const mahasiswa= res.data.data;
      console.log("tes : "+JSON.stringify(res.data.data));
      setUsers(mahasiswa);
  })
}
const choosePicture = () => {
  launchImageLibrary(options, (response) => {
    if (response.uri) {
      setimagePicture(response)
      // this.setState({ image: response });
    }
  });
};


  return (
    <View>
      <Text style={{ textAlign: "center", margin: 10 }}>  
        Form Input Mahasiswa
      </Text>
      {users.map((mahasiswa) => {
                return (
                  <View>
                  <TextInput
                  style={{ borderWidth: 1, marginBottom: 5 }}
                  value={mahasiswa.id}
                  key={mahasiswa.id}
                   onChangeText={(text) => setId(text)}
                >
                  
                </TextInput>
                <TextInput
                  style={{ borderWidth: 1, marginBottom: 5 }}
                  onChangeText={(text) => setNama(text)}
                  >
                   {mahasiswa.nama}
                </TextInput>
                <TextInput
                  style={{ borderWidth: 1, marginBottom: 5 }}
                  onChangeText={(text) => setAlamat(text)}
                  >
                  {mahasiswa.alamat}
                </TextInput>
                <TextInput
                  style={{ borderWidth: 1, marginBottom: 5 }}
                  onChangeText={(text) => setJurusan(text)}
                  >
                  {mahasiswa.jurusan}
                </TextInput>
                <View style={{flexDirection: 'row'}}> 
                <Image
                    source={{ uri: imagePicture.uri }}
                    style={{ width: 300, height: 300 }}
                  />
                <TouchableHighlight
                        activeOpacity={1}
                        onPress={choosePicture}>
                        <Text numberOfLines={1} style={{marginTop: 5, fontSize: 18, fontWeight: 'bold'}}>
                          Change Profile Image
                        </Text>
                    </TouchableHighlight>
                </View>
                </View>   
                       )
                })}
      <TouchableHighlight onPress={update} style={styles.btnSimpan}>
        <Text style={styles.textBtn}>UPDATE</Text>
      </TouchableHighlight>
    </View>
  );
};

export default EditData;

const styles = StyleSheet.create({
  btnSimpan: {
    backgroundColor: "lightblue",
    padding: 10,
    alignItems: "center"
  },
  textBtn: {
    fontSize: 20,
    color: "white"
  },
  delete: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginRight: 10
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 20
  },
  desc: {
    marginLeft: 18,
    flex: 1
  }
});