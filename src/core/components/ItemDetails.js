//@ts-check
import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  withAlertService,
  withFirebase,
  uniqueId,
  GridWithNewButton,
  ImagesTaken,
  BottomRightButton,
} from '../../shared/';

function ItemDetails({
  firebaseService: firebase,
  alertService: alerts,
  navigation,
}) {
  const [images, setImages] = useState([]);
  const [pasturas, setPasturas] = useState([]);
  const {item} = navigation.state.params;
  useEffect(() => {
    firebase
      .getDataFromInnerId('lotesDetails')(item.id)
      .then(item => {
        setImages(item.images);
        setPasturas(item.pasturas);
      });
  }, [item.id]);
  return (
    <View style={styles.detailsContainer}>
      <ImagesTaken images={images} />
      {/* <GridWithNewButton title="Pasturas" data={pasturas} /> */}
      <BottomRightButton
        buttons={[
          {
            name: 'upload',
            type: 'FontAwesome5',
            onPress: () => {},
          },
          {
            name: 'camera-retro',
            type: 'FontAwesome5',
            onPress: () => {},
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    height: '100%',
  },
  description: {
    fontSize: 21,
    textAlign: 'center',
  },
});

export default withAlertService(withFirebase(ItemDetails));
