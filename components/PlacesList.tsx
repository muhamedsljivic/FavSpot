import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import Place from '../models/place'; 
import PlaceItem from './PlacesItem';

interface Props {
  places: Place[];
}

export default function PlacesList({ places }: Props) {
  if(!places || places.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No places!</Text>
      </View>
    )
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={function (): void {
        throw new Error('Function not implemented.');
      } }/>}
    />
  );
}


const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});
