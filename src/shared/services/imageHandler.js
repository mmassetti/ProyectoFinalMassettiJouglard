//@ts-check
import {ImagePickerService} from './imagePickerService';
import {ImageProcessor} from './imageProcessor';
import {FirebaseService} from './firebaseService';
import {CloudinaryService} from './cloudinaryService';
import {ImageModel} from '../models/ImageModel';

export class ImageHandler {
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

  async pickImage(picker) {
    const {uri, data, width, height} = await this.imagePicker[
      'getImageFrom' + picker
    ]();
    let imgModel = new ImageModel(data, height, width, uri);
    const processed = this.processImage(imgModel);
    const saveImage = async () => {
      await this.cloudinaryService.uploadPhoto(uri);
    };
  }

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
        processedImage,
      },
    };
  }
}
