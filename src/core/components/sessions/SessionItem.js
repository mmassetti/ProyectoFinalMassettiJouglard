import React from 'react';
import {Text} from 'react-native';

export default function SessionItem({item}) {
  return (
    <>
      <Text>Descripcion: {item.data().description}</Text>
      <Text>Usuario: {item.data().user}</Text>
      <Text>
        Fecha:
        {item
          .data()
          .date.toDate()
          .toISOString()}
      </Text>
    </>
  );
}
