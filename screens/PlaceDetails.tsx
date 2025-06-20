import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { fetchPlaceById } from '../util/database';
import Place from '../models/place';

type PlaceDetailsRouteProp = RouteProp<RootStackParamList, 'placeDetails'>;

export default function PlaceDetails() {
  const route = useRoute<PlaceDetailsRouteProp>();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);

  const placeId = route.params.placeId;

  useEffect(() => {
    async function loadPlace() {
      const fetchedPlace = await fetchPlaceById(placeId);
      setPlace(fetchedPlace);
      setLoading(false);
    }

    loadPlace();
  }, [placeId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!place) {
    return (
      <View style={styles.centered}>
        <Text>Place not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
        <Text style={styles.coords}>
          {place.location.lat.toFixed(5)}, {place.location.lng.toFixed(5)}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  details: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  coords: {
    fontSize: 14,
    color: '#888',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
