import { useEffect, useState } from 'react';
import { Alert, View, StyleSheet, Image, Text, Pressable } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { getAddress, getMapPreview } from '../util/location';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface Props {
  onPickLocation: (location: Location) => void;
}

export default function LocationPicker({ onPickLocation }: Props) {
  const [selectedCoords, setSelectedCoords] = useState<Location | undefined>();
  const isScreenFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'addPlace'>>();

  const [permissionInfo, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    const lat = (route.params as any)?.pickedLat;
    const lng = (route.params as any)?.pickedLng;

    if (isScreenFocused && lat && lng) {
      const coords = { lat, lng };
      setSelectedCoords(coords);
      console.log('Picked from Map:', coords);
    }
  }, [isScreenFocused, route.params]);

  useEffect(() => {
    async function fetchAndSetAddress() {
      if (!selectedCoords) return;

      onPickLocation(selectedCoords);
      const addr = await getAddress(selectedCoords.lat, selectedCoords.lng);
      console.log('Resolved Address:', addr);
      onPickLocation({ ...selectedCoords, address: addr });
    }

    fetchAndSetAddress();
  }, [selectedCoords]);

  async function checkPermissions() {
    if (!permissionInfo) return false;

    const { status } = permissionInfo;

    if (status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }

    if (status === PermissionStatus.DENIED) {
      Alert.alert('Permission Required', 'Please grant location access.');
      return false;
    }

    return true;
  }

  async function detectUserLocation() {
    const permissionGranted = await checkPermissions();
    if (!permissionGranted) return;

    const currentLoc = await getCurrentPositionAsync();
    const coords = {
      lat: currentLoc.coords.latitude,
      lng: currentLoc.coords.longitude,
    };
    console.log('Device location:', coords);
    setSelectedCoords(coords);
  }

  function openMapHandler() {
    navigation.navigate('Map');
  }

  const previewContent = selectedCoords ? (
    <Image
      style={styles.image}
      source={{ uri: getMapPreview(selectedCoords.lat, selectedCoords.lng) }}
    />
  ) : (
    <Text>No location selected.</Text>
  );

  return (
    <View>
      <View style={styles.mapPreview}>{previewContent}</View>
      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={detectUserLocation}>
          <Text style={styles.buttonText}>Locate Me</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={openMapHandler}>
          <Text style={styles.buttonText}>Select on Map</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#003b73',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
