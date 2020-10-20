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
      style={{alignSelf: 'center', padding: '2%', marginVertical: 15}}
      onPress={save}
      primary>
      <Text style={{color: 'white', fontSize: 17}}>Guardar</Text>
    </Button>
  );
}
