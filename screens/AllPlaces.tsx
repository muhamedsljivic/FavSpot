import { useEffect, useState } from 'react';
import { useIsFocused, RouteProp } from '@react-navigation/native';

import PlacesList from '../components/PlacesList';
import {Place} from '../models/place';
import { RootStackParamList } from '../App'; // ili gdje god ti je definisana navigacija

type AllPlacesRouteProp = RouteProp<RootStackParamList, 'allPlaces'>;

interface AllPlacesProps {
  route: AllPlacesRouteProp;
}

export default function AllPlaces({ route }: AllPlacesProps) {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params?.place) {
      setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route.params]);

  return <PlacesList places={loadedPlaces} />;
}
