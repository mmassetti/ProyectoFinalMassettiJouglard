import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Item, Input as NativeInput} from 'native-base';

export function Input({
  placeholder,
  style = {},
  onChange,
  value,
  maxLength = 280,
}) {
  const [size, setSize] = useState(500);
  return (
    <View style={style}>
      <Item style={{width: '100%'}}>
        <NativeInput
          value={value}
          disableFullscreenUI={false}
          onChangeText={onChange}
          style={{fontSize: 15}}
          multiline={true}
          numberOfLines={3}
          placeholder={placeholder}
          maxLength={maxLength}
          onContentSizeChange={({nativeEvent}) =>
            setSize(nativeEvent.contentSize.height)
          }
        />
      </Item>
      <Text
        style={{
          color: 'gray',
          alignSelf: 'flex-end',
          marginRight: 15,
          fontSize: 14,
        }}>
        {value.length}/{maxLength}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {},
});
