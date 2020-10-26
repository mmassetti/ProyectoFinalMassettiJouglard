import AsyncStorage from '@react-native-community/async-storage';

export async function addPhotoToSync(photo) {
  const pics = await getPhotosToSync();
  pics.push(photo);
  return AsyncStorage.setItem('cloudinaryPics', JSON.stringify(pics));
}

export async function removeSyncPhoto(id) {
  const pics = await getPhotosToSync();
  const filteredPics = pics.filter(pic => pic.id != id);
  return AsyncStorage.setItem('cloudinaryPics', JSON.stringify(filteredPics));
}

export async function getPhotosToSync() {
  return JSON.parse(await AsyncStorage.getItem('cloudinaryPics'));
}
