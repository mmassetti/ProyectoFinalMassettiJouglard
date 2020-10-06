//@ts-check
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Animated} from 'react-native';
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
  BackgroundProvider,
  Background,
} from '../../shared';
import {NavDeleteButton} from '../../shared/components/NavDeleteButton';
import {useFocusEffect} from '@react-navigation/native';

function LoteDetails({
  firebaseService: firebase,
  alertService: alerts,
  navigation,
  route,
  imageHandler,
}) {
  const [images, setImages] = useState([]);
  const [pasturas, setPasturas] = useState([]);
  const [itemDetail, setItemDetail] = useState();
  const {item, docRef: sessionDocRef} = route.params;
  const [docRef, setDocRef] = useState();
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh(prev => !prev);

  const [background, setBackground] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Detalles del lote',
      headerRight: () => (
        <NavDeleteButton
          onPress={() => {
            alerts
              .showConfirmDialog(
                '¡Atención! Se eliminará este lote y toda la información asociada a ella. ',
              )
              .then(() => {
                firebase.deleteInBatch(
                  pasturas.map(pastura => pastura.id),
                  'pasturasDetails',
                );
                firebase
                  .remove(sessionDocRef, 'lotes', 'lotesDetails', item.id)
                  .then(navigation.goBack);
              });
          }}
        />
      ),
    });
  }, [docRef, pasturas]);

  useFocusEffect(
    React.useCallback(() => {
      firebase
        .getDocRefInnerId('lotesDetails', item.id)
        .then(({docRef, data}) => {
          setItemDetail(data);
          setImages(data.images);
          setPasturas(data.pasturas);
          setDocRef(docRef);
        });
      return () => {};
    }, [item.id, refresh]),
  );

  const routeWithImage = picker => async () => {
    const imageResponse = await imageHandler.pickImage({docRef})(picker);
    navigation.navigate('Imagen', imageResponse);
  };

  return (
    <DocRefContextProvider docRef={docRef}>
      <BackgroundProvider>
        <View style={styles.detailsContainer}>
          <Info item={itemDetail} />
          <Tabs
            secondTitle="Pasturas"
            firstTitle="Imagenes"
            FirstScreen={() => <ImagesTaken images={images} />}
            SecondScreen={() => (
              <GridWithNewButton
                title=""
                newItemText="Nueva pastura"
                data={pasturas}
                arrayName="pasturas"
                detailsCollection="pasturasDetails"
                refresh={toggleRefresh}
                defaultObj={{}}
                nextScreen="PasturasDetails"
                docRef={docRef}
              />
            )}
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
      </BackgroundProvider>
    </DocRefContextProvider>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    height: '100%',
    zIndex: 10,
  },
  description: {
    fontSize: 21,
    textAlign: 'center',
  },
});

export default withImageHandler(withAlertService(withFirebase(LoteDetails)));
