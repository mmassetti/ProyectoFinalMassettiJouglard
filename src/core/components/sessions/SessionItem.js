import React from 'react';
import {Text} from 'react-native';

export default function SessionItem({item}) {
  console.log('Props', item);
  return (
    <>
      <Text>Descripcion: {item.description}</Text>
      <Text>Usuario: {item.user}</Text>
      <Text>Fecha: {item.date.toDate().toISOString()}</Text>
    </>
  );
}
