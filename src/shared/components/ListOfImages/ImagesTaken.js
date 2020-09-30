import React, {useState} from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import {OverlappingEntries} from './OverlappingImages';
import {useAnimation} from '../../services/animations';

export function ImagesTaken({images}) {
  const [somethingOpened, setOpened] = useState(false);
  const [opacity, triggerOpacity, resetOpacity] = useAnimation(0, 200);
  return (
    <ScrollView style={{minHeight: '100%'}} fadingEdgeLength={250}>
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
          minHeight: Dimensions.get('screen').height * 0.7,
        }}>
        {images.map((item, key) => {
          return (
            <OverlappingEntries
              key={key}
              item={item}
              somethingOpened={somethingOpened}
              openBehindScreen={() => {
                setOpened(true);
                triggerOpacity(0.6);
              }}
            />
          );
        })}
      </View>
      <View style={{height: 90}} />
    </ScrollView>
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
