import React from 'react';
import {TouchableOpacity, Text} from 'react-native-gesture-handler';
import {withCloudinary, withFirebase} from './HOCForInjection/WithService';

export const SaveImage = withCloudinary(
  withFirebase(function Inner({
    onSave,
    image,
    cloudinaryService,
    firebaseService,
  }) {
    return (
      <TouchableOpacity onPress={onSave}>
        <Text>Guardar</Text>
      </TouchableOpacity>
    );
  }),
);
