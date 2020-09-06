import React from 'react';
import {FirebaseService} from '../../services/firebaseService';
import {CloudinaryService} from '../../services/cloudinaryService';
import {ImagePickerService} from '../../services/imagePickerService';
import {ImageProcessor} from '../../services/imageProcessor';
import {AlertService} from '../../services/alertsService';
import {SessionsService} from '../../services/sessions';

export const InjectorService = (Service, serviceName) => Component => {
  return function WrappedComponent(props) {
    const updatedProps = {...props, [serviceName]: Service.getInstance()};
    return <Component {...updatedProps} />;
  };
};

export const withFirebase = InjectorService(FirebaseService, 'firebaseService');
export const withCloudinary = InjectorService(
  CloudinaryService,
  'cloudinaryService',
);
export const withImageProcessing = InjectorService(
  ImageProcessor,
  'imageProcessor',
);
export const withImagePicker = InjectorService(
  ImagePickerService,
  'imagePicker',
);
export const withAlertService = InjectorService(AlertService, 'alertService');
export const withSessionsService = InjectorService(
  SessionsService,
  'sessionsService',
);
