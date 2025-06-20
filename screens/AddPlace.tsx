import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App"; 
import Place  from "models/place";
import PlaceForm from "../components/PlaceForm";
import { CommonActions } from '@react-navigation/native';
import { insertPlace } from "util/database";

type Props = NativeStackScreenProps<RootStackParamList, 'addPlace'>;

export default function AddPlace({ navigation }: Props) {
  async function addPlaceHandler(place: Place) {
   await insertPlace(place);
   navigation.dispatch(
    CommonActions.reset({
        index: 0,
        routes: [{ name: 'allPlaces'}],
  })
);
  }

  return <PlaceForm onAddPlace={addPlaceHandler} />;
}
