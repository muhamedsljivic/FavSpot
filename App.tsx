import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import React from 'react';
import IconButton from './UI/IconButton';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="allPlaces" component={AllPlaces} options={({navigation}) =>({ title: 'All Places',
            headerRight: ({tintColor}) => <IconButton icon='add' color={'black'} size={24} onPress={() => navigation.navigate("addPlace")}/>
             
          })}/>
          <Stack.Screen name="addPlace" component={AddPlace} options={{title: "Add Place"}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
