import React from 'react';
import {ImagePickerService} from '../../services/imagePickerService';

export function withImagePicker(WrappedComponent) {
  return function WithImagePicker(props) {
    return (
      <WrappedComponent
        imagePicker={ImagePickerService.getInstance()}
        {...props}
      />
    );
  };
}
