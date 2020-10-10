//@ts-check
import {ImagePickerService} from './imagePickerService';
import {ImageProcessor} from './imageProcessor';
import {FirebaseService} from './firebaseService';
import {CloudinaryService} from './cloudinaryService';
import {ImageModel} from '../models/ImageModel';
import {Singleton} from './singletonService';
import {uuidv4} from './uuidService';
import AsyncStorage from '@react-native-community/async-storage';
import {store} from '../../store/index';

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
      const onSave = async (
        percentages = processed.percentages,
        image = uri,
      ) => {
        console.log('inside', image);
        console.log('percentages', percentages);
        const imageId = uuidv4();
        this.saveImageLocally(imageId, uri);
        return this.saveImageInTheCloud(
          imageId,
          image,
          percentages,
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
    const percentagesPromise = this.recalculateNewPercentages(
      percentages,
      !saveConfig.beforeId ? 'Before' : 'After',
    );
    const uploadPromise = this.firebaseService.uploadPhoto(
      saveConfig,
      imageToAdd,
    );
    return Promise.all([percentagesPromise, uploadPromise]);
  }

  recalculateNewPercentages(percentages, type) {
    const {session, lote, pastura} = store.getState();

    let batch;
    if (pastura.data) {
      console.log('Entra Pastura');
      batch = this.firebaseService.appendUpdateToBatch(pastura.docRef, {
        ['totalImages' + type]: pastura.data['totalImages' + type] + 1,
        ['average' + type]: this.generateNewObject(
          percentages,
          pastura.data['average' + type],
        ),
      });
    }

    const loteBatch = this.firebaseService.appendUpdateToBatch(
      lote.docRef,
      {
        pasturas: pastura.data
          ? this.generateNewArray(
              lote.data.pasturas,
              pastura.data.id,
              percentages,
              type,
            )
          : lote.data.pasturas,
        ['average' + type]: this.generateNewObject(
          percentages,
          lote.data['average' + type],
        ),
        ['totalImages' + type]: lote.data['totalImages' + type] + 1,
      },
      batch,
    );
    const sessionBatch = this.firebaseService.appendUpdateToBatch(
      session.docRef,
      {
        lotes: this.generateNewArray(
          session.data.lotes,
          lote.data.id,
          percentages,
          type,
        ),
      },
      loteBatch,
    );
    return sessionBatch.commit();
  }

  generateNewArray(array, id, newPercentages, type) {
    return array.map(item => {
      if (item.id == id) {
        item['average' + type] = this.generateNewObject(
          newPercentages,
          item['average' + type],
        );
        item['totalImages' + type]++;
      }
      return item;
    });
  }

  generateNewObject(newPercentages, oldPercentages) {
    let item = oldPercentages;
    item.totalGreen += newPercentages.percentageGreen;
    item.totalYellow += newPercentages.percentageYellow;
    item.totalNaked += newPercentages.percentageNaked;
    return item;
  }
}

export const ImageHandler = new Singleton(InnerImageHandler);
