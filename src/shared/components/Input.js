import React, {useState, useEffect} from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';
import {Item, Input} from 'native-base';

export function MyInput({
  placeholder,
  onChange,
  resetText = false,
  maxLength = 280,
}) {
  const [text, setText] = useState('');
  const [size, setSize] = useState(100);
  useEffect(() => {
    onChange(text);
  }, [text]);
  useEffect(() => {
    setText('');
  }, [resetText]);

  return (
    <>
      <Item style={{height: size, width: '100%'}}>
        <TextInput
          keyboardType="default"
          multiline={true}
          autoCorrect={true}
          style={{fontSize: 16}}
          maxLength={maxLength}
          placeholder={placeholder}
          onChangeText={setText}
          onContentSizeChange={({nativeEvent}) =>
            setSize(nativeEvent.contentSize.height)
          }
          value={text}
        />
      </Item>
      <Text
        style={{
          color: 'gray',
          alignSelf: 'flex-end',
          marginRight: 15,
          fontSize: 14,
        }}>
        {text.length}/{maxLength}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  input: {},
});
