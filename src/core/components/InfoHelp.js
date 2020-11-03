//@ts-check
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';

function InfoHelp({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          tintColor="white"
          //   onPress={() => {
          //     navigation.navigate('Main', {
          //       showInfo: false,
          //     });
          //   }}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>INfo</Text>
    </View>
  );
}
export default InfoHelp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
