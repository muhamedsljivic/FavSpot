import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App"; 
import { Place } from "models/place";
import PlaceForm from "../components/PlaceForm";
import { CommonActions } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'addPlace'>;

export default function AddPlace({ navigation }: Props) {
  function addPlaceHandler(place: Place) {
   navigation.dispatch(
    CommonActions.reset({
        index: 0,
        routes: [{ name: 'allPlaces', params: { place } }],
  })
);
  }

  return <PlaceForm onAddPlace={addPlaceHandler} />;
}
