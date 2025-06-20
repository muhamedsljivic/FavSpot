import { useEffect, useState } from 'react';
import { useIsFocused, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import PlacesList from '../components/PlacesList';
import Place from '../models/place';
import { fetchPlaces } from '../util/database';
import { RootStackParamList } from '../App';
import { clearPlaces } from '../util/database';
import { Button, View, StyleSheet, Alert } from 'react-native';

type AllPlacesRouteProp = RouteProp<RootStackParamList, 'allPlaces'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AllPlacesProps {
  route: AllPlacesRouteProp;
}

export default function AllPlaces({ route }: AllPlacesProps) {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp>();

  async function handleClearAll() {
  Alert.alert('Confirm Deletion', 'Delete all saved places?', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Delete',
      style: 'destructive',
      onPress: async () => {
        try {
          await clearPlaces();
          setLoadedPlaces([]); 
          Alert.alert('Success', 'All places deleted.');
        } catch (err) {
          console.error('Failed to clear places:', err);
          Alert.alert('Error', 'Failed to delete places.');
        }
      },
    },
  ]);
}

  useEffect(() => {
    async function loadPlaces() {
      try {
        const placesFromDB = await fetchPlaces();
        setLoadedPlaces(placesFromDB);
      } catch (err) {
        console.error('Failed to load places:', err);
      }
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  useEffect(() => {
    if (route.params?.place) {
      setLoadedPlaces((current) => [route.params.place, ...current]);
    }
  }, [route.params?.place]);

  function handleSelectPlace(placeId: number) {
    navigation.navigate('placeDetails', { placeId });
  }

return (
  <View style={styles.container}>
    <Button title="Delete All Places" color="red" onPress={handleClearAll} />
    <PlacesList places={loadedPlaces} onSelectPlace={handleSelectPlace} />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});