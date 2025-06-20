import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Place from '../models/place';

interface Props {
  place: Place;
  onSelect: () => void;
}

export default function PlaceItem({ place, onSelect }: Props) {
    return (
         <Pressable style={styles.item} onPress={onSelect}>
            <Image source={{ uri: place.imageUrl }} style={styles.image} />
            <View>
                <Text style={styles.title}>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
          </Pressable>
    )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  title: {
    fontWeight: 'bold',
  },
});