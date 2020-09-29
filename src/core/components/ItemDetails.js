//@ts-check
import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  withAlertService,
  withFirebase,
  Tabs,
  GridWithNewButton,
  ImagesTaken,
  BottomRightButton,
  Info,
  withImageHandler,
  DocRefContextProvider,
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
  const [docRef, setDocRef] = useState();
  const {item} = navigation.state.params;

  useEffect(() => {
    firebase
      .getDocRefInnerId('lotesDetails', item.id)
      .then(({docRef, data}) => {
        setItemDetail(data);
        setImages(data.images);
        setPasturas(data.pasturas);
        setDocRef(docRef);
      });
  }, [item.id]);

  const routeWithImage = picker => async () => {
    const imageResponse = await imageHandler.pickImage({docRef});
    navigation.navigate('Imagen', imageResponse);
  };
  const noop = () => {};

  return (
    <DocRefContextProvider docRef={docRef}>
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
          SecondScreen={() => <ImagesTaken images={images} />}
        />
        <BottomRightButton
          withBackground={true}
          buttons={[
            {
              name: 'upload',
              type: 'FontAwesome5',
              onPress: routeWithImage('Gallery'),
            },
            {
              name: 'camera-retro',
              type: 'FontAwesome5',
              onPress: routeWithImage('Camera'),
            },
          ]}
        />
      </View>
    </DocRefContextProvider>
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
