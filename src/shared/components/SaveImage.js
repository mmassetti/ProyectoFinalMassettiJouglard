import React from 'react';
import {Text} from 'react-native';
import {Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export function SaveImage({onSave, image, percentages}) {
  const navigation = useNavigation();

  async function save() {
    console.log(image.getSource());
    console.log(percentages);
    await onSave();
    navigation.goBack();
  }

  return (
    <Button
      onPress={() => {
        save();
      }}
      primary>
      <Text>Guardar</Text>
    </Button>
  );
}
