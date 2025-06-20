import { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from 'react-native';

import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import { Place } from 'models/place';
interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface PlaceFormProps {
  onAddPlace: (place: Place) => void;
}

function PlaceForm({onAddPlace}: PlaceFormProps) {
  const [enteredTitle, setEnteredTitle] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [pickedLocation, setPickedLocation] = useState<Location | undefined>();

  function changeTitleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri: string) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location: Location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    if (
    !pickedLocation ||
    !pickedLocation.address ||
    !selectedImage ||
    !enteredTitle
    ) {
    Alert.alert('Missing data', 'Please fill in all fields.');
    return;
    }

    const finalLocation = {
    lat: pickedLocation.lat,
    lng: pickedLocation.lng,
    address: pickedLocation.address,
    };

    const placeData = new Place(enteredTitle, selectedImage, finalLocation);
    onAddPlace(placeData);

}

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onImageTaken={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button title="Add Place" onPress={savePlaceHandler} />
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomWidth: 2,
  },
});
