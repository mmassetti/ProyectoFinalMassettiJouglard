//@ts-check
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Header, Content, DatePicker, Text} from 'native-base';

export default function NewSession(props) {
  let [chosenDate, setChosenDate] = useState(new Date());

  useEffect(() => {}, [chosenDate]);

  function setDate(newDate) {
    setChosenDate(newDate);
  }

  return (
    <Container>
      <Content>
        <DatePicker
          defaultDate={new Date(2018, 4, 4)}
          minimumDate={new Date(2018, 1, 1)}
          // maximumDate={new Date(2018, 12, 31)}
          locale={'es'}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={'fade'}
          androidMode={'default'}
          placeHolderText="Seleccionar fecha"
          textStyle={{color: 'green'}}
          placeHolderTextStyle={{color: '#d3d3d3'}}
          onDateChange={() => setDate}
          disabled={false}
        />
        <Text>Date: {chosenDate.toString().substr(4, 12)}</Text>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({});
