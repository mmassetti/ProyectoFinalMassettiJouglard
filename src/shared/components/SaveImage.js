import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {withCloudinary, withFirebase} from './HOCForInjection/WithService';
import {Button} from 'native-base';

export function SaveImage({onSave}) {
  return (
    <Button onPress={onSave} primary>
      <Text>Guardar</Text>
    </Button>
  );
}
