import React from 'react';
import {FirebaseService} from '../services/firebaseService';

export function withFirebase(WrappedComponent) {
  return function ComponentWithFirebase(props) {
    return (
      <WrappedComponent
        {...props}
        firebaseService={FirebaseService.getInstance()}
      />
    );
  };
}
