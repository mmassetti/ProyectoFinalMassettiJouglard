import React, {useState} from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {OverlappingEntries} from './OverlappingImages';
import {useAnimation} from '../services/animations';
import {NewAfterImage} from './NewAfterImage';
import {GridWithNewButton} from './GridWithNewButton';

export function ImagesTaken({images, loteId}) {
  const [somethingOpened, setOpened] = useState(false);
  const [opacity, triggerOpacity, resetOpacity] = useAnimation(0, 200);
  return (
    <>
      <Text style={styles.imageTitle}>Imagenes</Text>
      {somethingOpened ? (
        <TouchableOpacity
          onPress={() => {
            setOpened(false);
            resetOpacity();
          }}
          style={[{opacity}, styles.fullScreen]}
          activeOpacity={1}>
          <Animated.View
            style={[{opacity, backgroundColor: 'black'}, styles.fullScreen]}
          />
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          height: '50%',
        }}>
        {images.map((item, key) => {
          return (
            <OverlappingEntries
              key={key}
              item={item}
              somethingOpened={somethingOpened}
              loteId={loteId}
              openBehindScreen={() => {
                setOpened(true);
                triggerOpacity(0.6);
              }}
            />
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageTitle: {
    textAlign: 'center',
    fontSize: 19,
    marginBottom: 15,
  },
  fullScreen: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    zIndex: 10,
  },
});
