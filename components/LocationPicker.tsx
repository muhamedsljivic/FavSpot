import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Image } from 'react-native';
import { getCurrentPositionAsync, useForegroundPermissions } from 'expo-location';
import { PermissionStatus } from 'expo-location';
import { getMapPreview } from '../util/location';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';

export default function LocationPicker() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
   
    const [pickedLocation, setPickedLocation] = useState<{ lat: number; lng: number } | undefined>();
    const [locationPermission, requestPermission] = useForegroundPermissions();
 
  async function verifyPermissions() {
       if (!locationPermission) {
          return false;
        }
    
        const { status } = locationPermission;
    
        if (status === PermissionStatus.UNDETERMINED) {
          const response = await requestPermission();
          return response.granted;
        }
    
        if (status === PermissionStatus.DENIED) {
          Alert.alert(
            'Insufficient Permission',
            'You need to grant location permissions to use this feature.'
          );
          return false;
        }
    
        return true;
  }


  async function handleLocateUser() {
    const hasPermission = await verifyPermissions();
    if(!hasPermission) {
        return;
    }
    
    const location = await getCurrentPositionAsync();
    setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
    });
  }

  function handlePickOnMap() {
    navigation.navigate('Map');
  }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {pickedLocation ? (
            <Image
            style={styles.mapImage}
            source={{
                uri:  getMapPreview(pickedLocation.lat, pickedLocation.lng),
            }}
            />
        ) : (
            <Text>No location chosen yet.</Text>
        )}
        </View>


      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={handleLocateUser}>
          <Text style={styles.buttonText}>Locate User</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handlePickOnMap}>
          <Text style={styles.buttonText}>Pick on Map</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  previewText: {
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    gap: 12, 
  },
  button: {
    backgroundColor: '#01396d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  mapImage: {
  width: '100%',
  height: '100%',
}

});
