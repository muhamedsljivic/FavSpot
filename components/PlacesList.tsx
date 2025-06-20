import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import Place from '../models/place'; 

interface Props {
  places: Place[];
}

export default function PlacesList({ places }: Props) {
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.address}</Text>
          </View>
        </View>
      )}
    />
  );
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
