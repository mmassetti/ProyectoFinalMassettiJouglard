import React from 'react';
import {MyInput} from '../Input';

export function ImageNotes({updateNote}) {
  return <MyInput placeholder="Escriba una nota..." onChange={updateNote} />;
}
