import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native-gesture-handler';
import {Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import {mainThemeColor} from '../../configuration';

export function Info({item}) {
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfo = showInfo => () => {
    setShowInfo(showInfo);
  };
  return (
    <>
      <TouchableOpacity onPress={toggleInfo(true)} style={styles.button}>
        <Icon type="FontAwesome5" name="info-circle" />
        <Text>Info</Text>
      </TouchableOpacity>
      <Popover isVisible={showInfo}>
        <Text>Info</Text>
        <TouchableOpacity onPress={toggleInfo(false)}>
          <Text>Cerrar</Text>
        </TouchableOpacity>
      </Popover>
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
  },
});
