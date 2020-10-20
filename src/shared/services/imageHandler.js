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
        note,
      ) => {
        console.log('inside', image);
        console.log('percentages', percentages);
        const imageId = uuidv4();
        this.saveImageLocally(imageId, image);
        return this.saveImageInTheCloud(
          imageId,
          image,
          percentages,
          saveConfig,
          note,
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
    console.log(uri);
    AsyncStorage.setItem(imageId, uri);
  }
  async saveImageInTheCloud(imageId, uri, percentages, saveConfig, note) {
    const secure_url = await this.cloudinaryService.uploadPhoto(uri);
    const imageToAdd = {
      id: imageId,
      percentages,
      uri: secure_url,
      note,
    };
    const percentagesPromise = this.recalculateNewPercentages(
      percentages,
      !saveConfig.beforeId ? 'Before' : 'After',
    ).commit();
    const uploadPromise = this.firebaseService.uploadPhoto(
      saveConfig,
      imageToAdd,
    );
    return Promise.all([percentagesPromise, uploadPromise]);
  }

  recalculateNewPercentages(percentages, type, add = 1) {
    const {session, lote, pastura} = store.getState();

    let batch;
    if (pastura.data) {
      batch = this.firebaseService.appendUpdateToBatch(pastura.docRef, {
        ['totalImages' + type]: pastura.data['totalImages' + type] + add,
        ['average' + type]: this.generateNewObject(
          percentages,
          pastura.data['average' + type],
          add,
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
              add,
            )
          : lote.data.pasturas,
        ['average' + type]: this.generateNewObject(
          percentages,
          lote.data['average' + type],
          add,
        ),
        ['totalImages' + type]: lote.data['totalImages' + type] + add,
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
          add,
        ),
      },
      loteBatch,
    );
    return sessionBatch;
  }

  generateNewArray(array, id, newPercentages, type, add) {
    return array.map(item => {
      if (item.id == id) {
        item['average' + type] = this.generateNewObject(
          newPercentages,
          item['average' + type],
          add,
        );
        item['totalImages' + type] += add;
      }
      return item;
    });
  }

  generateNewObject(newPercentages, oldPercentages, adjust = 1) {
    let item = oldPercentages;
    item.totalGreen += adjust * newPercentages.percentageGreen;
    item.totalYellow += adjust * newPercentages.percentageYellow;
    item.totalNaked += adjust * newPercentages.percentageNaked;
    return item;
  }

  deletePhoto(imageItem, type) {
    console.log('imageItem', imageItem);
    const {lote, pastura} = store.getState();
    let arrayBatch;
    if (imageItem.after) {
      arrayBatch = this.recalculateNewPercentages(
        imageItem.after.percentages,
        'After',
        -1,
      );
    }
    if (type === 'Before') {
      const beforeBatch = this.recalculateNewPercentages(
        imageItem.before.percentages,
        'Before',
        -1,
      );
      beforeBatch.commit();
    }
    let finalBatch;
    if (pastura.data) {
      finalBatch = this.firebaseService.appendUpdateToBatch(
        pastura.docRef,
        {
          images: this.deletePhotoFromArray(
            pastura.data.images,
            type,
            imageItem[type.toLowerCase()].id,
          ),
        },
        arrayBatch,
      );
    } else {
      finalBatch = this.firebaseService.appendUpdateToBatch(
        lote.docRef,
        {
          images: this.deletePhotoFromArray(
            lote.data.images,
            type,
            imageItem[type.toLowerCase()].id,
          ),
        },
        arrayBatch,
      );
    }
    return finalBatch.commit();
  }

  deletePhotoFromArray(array, type, imageId) {
    if (type == 'Before') {
      return array.filter(item => item.before.id !== imageId);
    } else {
      return array.map(item => {
        if (item.after.id == imageId) {
          return {before: item.before};
        }
        return item;
      });
    }
  }
}

export const ImageHandler = new Singleton(InnerImageHandler);
