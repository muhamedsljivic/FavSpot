import { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native"
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

export default function PlaceForm() {
    const [title, setTitle] = useState('');

    function titleHandler(enteredText: string){
        setTitle(enteredText);
    }
     return (
     <ScrollView style={styles.form}>
         <View style={styles.inputContainer}>
             <Text style={styles.label}>Title</Text>
             <TextInput
               style={styles.input}
               onChangeText={titleHandler}
               value={title}
             />
          </View>
          <ImagePicker />
          <LocationPicker />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
});