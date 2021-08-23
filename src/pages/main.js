import React, {useState, useEffect} from  'react';
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location';

import {MaterialIcons} from '@expo/vector-icons';
import api from '../services/api';

function Main({navigation}){
 
     const [currentRegion, setCurrentRegion] = useState(null);
     const [devs, setDevs] = useState([]);

      useEffect(()=>{
         async function loadInitialPosition(){
            const {granted} = await requestForegroundPermissionsAsync();
            if (granted) {
               const {coords} = await getCurrentPositionAsync({
                   enableHighAccuracy: true,
               });
               const {latitude, longitude} =  coords;
               setCurrentRegion({
                   latitude,
                   longitude,
                   latitudeDelta: 0.04,
                   longitudeDelta: 0.04,
               });
            }

         }
         loadInitialPosition();

     },[]);
     
     async function loadDevs(){
        const {latitude, longitude} = currentRegion;
        const response = api.get('/search', {
                params: {
                  latitude,
                  longitude,
                  techs: 'react'
              }
          });

          setDevs(response.data)

     }

     function handleRegionChanged(region){
         console.log(region);
         setCurrentRegion(region);
     } 


     if(!currentRegion){
         return null;
     }

    return ( 
        <> 
         <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
               <Marker coordinate={{latitude: -5.0545993, longitude: -42.7325482}} >
                  <Image style={styles.avatar} source={{uri: 'https://scontent.fthe3-1.fna.fbcdn.net/v/t31.18172-8/29744661_1600194410078249_5954443186217319569_o.jpg?_nc_cat=105&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=gzoZDCujWigAX8Edymw&_nc_ht=scontent.fthe3-1.fna&oh=f7116df2d04d656b1d046d2f3b597033&oe=61444F8B'}} />
                  <Callout onPress={()=>{
                       navigation.navigate('Profile', {github_username: 'amaurifilho375'})
                  }}>
                     <View style={styles.callout}>
                         <Text style={styles.devName}> amauri</Text>
                         <Text style={styles.devBio}> gosto de programar</Text>
                         <Text style={styles.devTechs}> react, node, rails</Text>

                     </View>
                  </Callout>
               </Marker>    
           </MapView>
           <View style={styles.searchForm}>
              <TextInput
                 style={styles.searchInput}
                 placeholder="buscar devs por techs"
                 placeholderTextColor="#999"
                 autoCapitalize="words"
                 autoCorrect={false}
              />
         
            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
              <MaterialIcons name="my-location" size={20} color="#FFF"/>
            </TouchableOpacity>    
         </View>
        </>

        );
}

const styles = StyleSheet.create({
     map: {
         flex: 1
     },
     avatar: {
         width: 54,
         height: 54,
         borderRadius: 4,
         borderWidth: 4,
         borderColor: '#FFF'
     },

     callout: {
         width: 260,
     },
     devName: {
         fontWeight: 'bold',
         fontSize: 16,
     },
     devBio: {
        color: '#665',
        marginTop: 5,
     },
     devTechs: {
          marginTop: 5
     },
    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        display: 'flex',
        flexDirection: 'row',

    },
    searchInput: {
      flex: 1,
      height: 50,
      backgroundColor: '#FFF',
      color: '#333',
      borderRadius: 25,
      paddingHorizontal: 20,
      fontSize: 16,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {
          width: 4,
          height: 4,
      },
      elevation: 2,

    },
    
    loadButton: {
       width: 50,
       height: 50,
       backgroundColor: '#00FFFF',
       borderRadius: 25,
       justifyContent: 'center',
       alignItems: 'center',
       marginLeft: 15,

    },

});

export default Main;