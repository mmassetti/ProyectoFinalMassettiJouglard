import React, {useState} from 'react';
import {Icon} from 'native-base';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {mainThemeColor} from '../../configuration';

export function Info({item}) {
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfo = showInfo => () => {
    setShowInfo(showInfo);
  };
  return (
    <>
      <TouchableOpacity onPress={toggleInfo(true)} style={styles.button}>
        <Icon type="FontAwesome5" name="info-circle" style={styles.text} />
        <Text style={styles.text}>Mas</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: mainThemeColor(1),
    color: 'white',
    borderRadius: 3,
    width: '50%',
    alignSelf: 'center',
    padding: 20,
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
