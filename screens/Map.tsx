import MapView, {Marker, Region, MapPressEvent} from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import IconButton from "UI/IconButton";

export default function Map() {
    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const region: Region = {
        latitude: 43.8563,       
        longitude: 18.4131,
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421,
    };

     function markLocationHandler(event: MapPressEvent) {
        const { coordinate } = event.nativeEvent;
        setSelectedLocation({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
  }

    const saveMarkedLocationHandler = useCallback(() => {
        if(!selectedLocation) {
            Alert.alert("No location marked", "You have to mark a location first");
            return;
        }
        navigation.navigate("addPlace", {pickedLatitude: selectedLocation.latitude, pickedLongitude: selectedLocation.longitude});
    }, [navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="save" color='black' size={24} onPress={saveMarkedLocationHandler}/>
        })
    }, [navigation, saveMarkedLocationHandler]);

    return (
        <MapView style={styles.map} initialRegion={region} onPress={markLocationHandler}>
        {selectedLocation && (
            <Marker
            title="Selected location"
            coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
            }}
            />
        )}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})