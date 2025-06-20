import { Alert, Button, View, Image } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { useState } from 'react';

export default function ImagePicker() {
  const [permissionInfo, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState<string | undefined>();

  const verifyPermissions = async (): Promise<boolean> => {
    if (!permissionInfo) {
      return false;
    }

    const { status } = permissionInfo;

    if (status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }

    if (status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission',
        'You need to grant camera permissions to use this feature.'
      );
      return false;
    }

    return true;
  };

  const takePhotoHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

if (!image.canceled && image.assets && image.assets.length > 0) {
      setImageUri(image.assets[0].uri); 
    }
  };

  return (
    <View>
      <View>
        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 150 }} />}
      </View>
      <Button title="Take Photo" onPress={takePhotoHandler} />
    </View>
  );
}
