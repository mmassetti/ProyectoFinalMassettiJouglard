import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {Item, Input} from 'native-base';

export function MyInput({placeholder}) {
  return (
    <Item underline>
      <Input placeholder={placeholder} />
    </Item>
  );
}

const styles = StyleSheet.create({
  input: {},
});
