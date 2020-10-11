import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ReadMoreText} from '../../../shared/components/ReadMoreText';
import {lightGray} from '../../../configuration/colors';

export default function SingleNote({nota, index}) {
  return (
    <View style={[styles.container, index % 2 ? styles.odd : styles.even]}>
      <View style={styles.textContainer}>
        <ReadMoreText text={index + 1 + ') ' + nota} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '2%',
    flexDirection: 'row',
  },
  even: {},
  odd: {
    backgroundColor: lightGray,
  },
  textContainer: {
    flex: 2,
  },
});
