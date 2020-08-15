import React from 'react';
import {StyleSheet, View, Dimensions, ActivityIndicator} from 'react-native';

export function OurSpinner({show}) {
  console.log('Show', show);
  return show ? (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
});
