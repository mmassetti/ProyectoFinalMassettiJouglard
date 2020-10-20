import React, {useState, useEffect} from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';
import {Item, Input} from 'native-base';

export function MyInput({placeholder, onChange}) {
  const [text, setText] = useState('');
  const [size, setSize] = useState(100);
  useEffect(() => {
    onChange(text);
  }, [text]);

  return (
    <>
      <Item style={{height: size, width: '100%'}}>
        <TextInput
          multiline={true}
          style={{fontSize: 16}}
          maxLength={280}
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
        {text.length}/280
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  input: {},
});
