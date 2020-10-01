//@ts-check
import {ImagePickerService} from './imagePickerService';
import {ImageProcessor} from './imageProcessor';
import {FirebaseService} from './firebaseService';
import {CloudinaryService} from './cloudinaryService';
import {ImageModel} from '../models/ImageModel';
import {Singleton} from './singletonService';
import {uuidv4} from './uuidService';
import AsyncStorage from '@react-native-community/async-storage';

class InnerImageHandler {
  imagePicker;
  imageProcessor;
  firebaseService;
  cloudinaryService;

  constructor() {
    this.imagePicker = ImagePickerService.getInstance();
    this.imageProcessor = ImageProcessor.getInstance();
    this.firebaseService = FirebaseService.getInstance();
    this.cloudinaryService = CloudinaryService.getInstance();
  }

  pickImage = saveConfig => async picker => {
    const {uri, data, width, height} = await this.imagePicker[
      'getImageFrom' + picker
    ]();
    let imgModel = new ImageModel(data, height, width, uri);
    const processed = await this.processImage(imgModel);
    const objToReturn = {
      ...processed,
      originalImage: imgModel,
      shouldRotate: imgModel.width < imgModel.height,
    };
    if (saveConfig) {
      const onSave = async () => {
        const imageId = uuidv4();
        this.saveImageLocally(imageId, uri);
        return this.saveImageInTheCloud(
          imageId,
          uri,
          processed.percentages,
          saveConfig,
        );
      };
      Object.assign(objToReturn, {onSave});
    }
    return objToReturn;
  };

  async processImage(imageModel) {
    const {
      img,
      percentageGreen,
      percentageYellow,
      percentageNaked,
    } = await this.imageProcessor.processImage(imageModel.uri);
    const processedImage = new ImageModel(
      img,
      imageModel.height,
      imageModel.width,
    );
    return {
      percentages: {
        percentageNaked,
        percentageGreen,
        percentageYellow,
      },
      processedImage,
    };
  }

  saveImageLocally(imageId, uri) {
    AsyncStorage.setItem(imageId, uri);
  }
  async saveImageInTheCloud(imageId, uri, percentages, saveConfig) {
    const secure_url = await this.cloudinaryService.uploadPhoto(uri);
    const imageToAdd = {
      id: imageId,
      percentages,
      uri: secure_url,
    };
    return this.firebaseService.uploadPhoto(saveConfig, imageToAdd);
  }
}

export const ImageHandler = new Singleton(InnerImageHandler);
