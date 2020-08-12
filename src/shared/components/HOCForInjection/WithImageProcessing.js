import React from 'react';
import {ImageProcessor} from '../../services/imageProcessor';

export function withImageProcessing(WrappedComponent) {
  return function WithImageProcessing(props) {
    return (
      <WrappedComponent
        {...props}
        imageProcessor={ImageProcessor.getInstance()}
      />
    );
  };
}
