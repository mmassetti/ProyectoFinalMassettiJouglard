import React from 'react';
import {Input} from '../CustomInput';

export function ImageNotes({value, updateNote}) {
  return (
    <Input
      placeholder="Escriba una nota..."
      value={value}
      onChange={updateNote}
    />
  );
}
