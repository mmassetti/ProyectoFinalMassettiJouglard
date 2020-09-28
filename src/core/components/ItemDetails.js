//@ts-check
import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  withAlertService,
  withFirebase,
  Tabs,
  uniqueId,
  GridWithNewButton,
  ImagesTaken,
  BottomRightButton,
  Info,
  withImageHandler,
} from '../../shared/';

function ItemDetails({
  firebaseService: firebase,
  alertService: alerts,
  navigation,
  imageHandler,
}) {
  const [images, setImages] = useState([]);
  const [pasturas, setPasturas] = useState([]);
  const [itemDetail, setItemDetail] = useState();
  const {item} = navigation.state.params;
  useEffect(() => {
    firebase
      .getDataFromInnerId('lotesDetails')(item.id)
      .then(item => {
        setItemDetail(item);
        setImages(item.images);
        setPasturas(item.pasturas);
      });
  }, [item.id]);
  const handleImage = imageHandler.pickImage({
    collectionName: 'lotesDetails',
    itemId: item.id,
  });
  const noop = () => {};
  return (
    <View style={styles.detailsContainer}>
      <Info item={itemDetail} />
      <Tabs
        firstTitle="Pasturas"
        secondTitle="Imagenes"
        FirstScreen={() => (
          <GridWithNewButton
            title=""
            data={pasturas}
            onEntryClick={noop}
            onNewClick={noop}
            onDeleteEntry={noop}
          />
        )}
        SecondScreen={() => <ImagesTaken images={images} loteId={item.id} />}
      />
      <BottomRightButton
        withBackground={true}
        buttons={[
          {
            name: 'upload',
            type: 'FontAwesome5',
            onPress: async () => {
              const imageResponse = await handleImage('Gallery');
              navigation.navigate('Imagen', imageResponse);
            },
          },
          {
            name: 'camera-retro',
            type: 'FontAwesome5',
            onPress: async () => {
              const imageResponse = await handleImage('Camera');
              navigation.navigate('Imagen', imageResponse);
            },
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

export default withImageHandler(withAlertService(withFirebase(ItemDetails)));
