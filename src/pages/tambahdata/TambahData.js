import React, {useState, PureComponent} from 'react';
import {View, Text, TextInput, TouchableHighlight,Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
// import ImagePicker from 'react-native-image-picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AppConfig from '../../constant';

const options = {
  title: 'select a photo',
  chooseFromLibraryButtonTitle:'choose photo',
  mediaType: 'photo',
  // includeBase64: true,
  quality: 1
}


const TambahData = ({navigation}) => {
        const [id, setId] =useState("");
        const [nama, setNama] =useState("");
        const [alamat, setAlamat] =useState("");
        const [jurusan, setJurusan] =useState("");
        const [image, setImage] =useState("");
    


        const GoTo = () => {
            navigation.navigate("List Data");
        }
        const simpan  =() => {
            const data = new FormData();
            data.append('nama', nama);
            data.append('alamat', alamat);
            data.append('jurusan', jurusan);
            data.append('image', image);
            axios.post(AppConfig.BASE_URL+ "backend_CRUD_ReactNative/api/mahasiswas/tambah", data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                    .then(function (response) {
                      alert(JSON.stringify(response))
                      setNama("");
                      setAlamat("");
                      setJurusan("");
                      setImage("");
                    })
                    .catch(function (error) {
                      alert(error)
                      console.log(error);
                    });
        }

      const choosePicture = () => {
          launchImageLibrary(options, (response) => {
            if (response.uri) {
              setImage(response)
              // this.setState({ image: response });
            }
          });
        };
      // const { image } = this.state;

    return (
        <View>
                <Text style={{textAlign: 'center', margin: 10}}> Form Input Mahasiswa</Text>
                <TextInput placeholder="Masukkan Nama" style={{borderWidth: 1, marginBottom: 5}} value={nama} onChangeText={(value) => setNama(value)}></TextInput>
                <TextInput placeholder="Masukkan alamat" style={{borderWidth: 1, marginBottom: 5}}value={alamat} onChangeText={(value) => setAlamat(value)}></TextInput>
                <TextInput placeholder="Masukkan Jurusan" style={{borderWidth: 1, marginBottom: 5}}value={jurusan} onChangeText={(value) => setJurusan(value)}></TextInput>
                
                 <Image
                    source={{ uri: image.uri }}
                    style={{ width: 300, height: 300 }}
                  />
                <TouchableHighlight
                        activeOpacity={1}
                        onPress={choosePicture}>
                        <Text numberOfLines={1} style={{marginTop: 5, fontSize: 18, fontWeight: 'bold'}}>
                          Change Profile Image
                        </Text>
                    </TouchableHighlight>
                <TouchableHighlight onPress={simpan} style={styles.btnSimpan}>
                <Text style={styles.textBtn} >Simpan</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={GoTo} style={styles.btnSimpan}>
                <Text style={styles.textBtn} >Lihat Data</Text>
                </TouchableHighlight>

        </View>
    )
}

export default TambahData;

const styles = StyleSheet.create({
    btnSimpan:{
        backgroundColor: 'lightblue',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
      },
      textBtn : {
        fontSize :20,
        color : 'white'
      },
      delete : {
          fontSize: 20,
          fontWeight : 'bold',
          color : 'red',
          marginRight:10
      },
      itemContainer : {
          flexDirection:'row',
          marginBottom:20
      },
      desc : {
          marginLeft:18,
          flex:1
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
})