import React from 'react';
import {Text} from 'react-native';
import {Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export function SaveImage({onSave}) {
  const navigation = useNavigation();

  async function save() {
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
