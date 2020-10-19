import React from 'react';
import {Text} from 'react-native';
import {Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export function SaveImage({onSave, image, percentages}) {
  const navigation = useNavigation();

  async function save() {
    console.log('outside', image.getSource());
    console.log('outside', percentages);
    await onSave(percentages, image.getSource());
    navigation.goBack();
  }

  return (
    <Button
      style={{alignSelf: 'center', padding: '2%', marginVertical: 15}}
      onPress={save}
      primary>
      <Text style={{color: 'white', fontSize: 17}}>Guardar</Text>
    </Button>
  );
}
