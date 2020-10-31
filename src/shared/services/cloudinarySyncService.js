import AsyncStorage from '@react-native-community/async-storage';
import {CloudinaryService} from './cloudinaryService';
import {FirebaseService} from './firebaseService';

const cloudinaryService = CloudinaryService.getInstance();
const firebaseService = FirebaseService.getInstance();

export async function addPhotoToSync(photo) {
  const pics = (await getPhotosToSync()) || [];
  pics.push(photo);
  return AsyncStorage.setItem('cloudinaryPics', JSON.stringify(pics));
}

export async function removeSyncPhoto(id) {
  const pics = (await getPhotosToSync()) || [];
  const filteredPics = pics.filter(pic => pic.imageId != id);
  return AsyncStorage.setItem('cloudinaryPics', JSON.stringify(filteredPics));
}

export async function getPhotosToSync() {
  return JSON.parse(await AsyncStorage.getItem('cloudinaryPics'));
}

export async function syncPhotosWithCloudinary() {
  const photos = (await getPhotosToSync()) || [];
  for (pic of photos) {
    cloudinaryService.uploadPhotoWithoutSpinner(pic.uri).then(secure_url => {
      console.log('SecureURL', secure_url);
      firebaseService.updatePhotoPic(pic, secure_url);
      removeSyncPhoto(pic.imageId);
    });
  }
}
