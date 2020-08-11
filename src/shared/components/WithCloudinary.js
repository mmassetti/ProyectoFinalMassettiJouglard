import React from 'react';
import {CloudinaryService} from '../services/cloudinaryService';

export function withCloudinary(WrappedComponent) {
  return function WithCloudinary(props) {
    return (
      <WrappedComponent
        {...props}
        cloudinaryService={CloudinaryService.getInstance()}
      />
    );
  };
}
