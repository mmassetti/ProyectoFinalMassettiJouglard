//@ts-check
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
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
} from '../../shared';
import {NavDeleteButton} from '../../shared/components/NavDeleteButton';
import {useFocusEffect} from '@react-navigation/native';
import {setLote} from '../../store/actions';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

function LoteDetails({
  firebaseService: firebase,
  alertService: alerts,
  navigation,
  lote,
  session,
  setLote,
  route,
  imageHandler,
}) {
  const [images, setImages] = useState([]);
  const [pasturas, setPasturas] = useState([]);
  const {item} = route.params;
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh(prev => !prev);

  useEffect(() => {
    navigation.setOptions({
      title: 'Detalles del lote',
      headerRight: () => (
        <NavDeleteButton
          onPress={() => {
            alerts
              .showConfirmDialog(
                '¡Atención! Se eliminará este lote y toda la información asociada a él. ',
              )
              .then(() => {
                firebase.deleteInBatch(
                  pasturas.map(pastura => pastura.id),
                  'pasturasDetails',
                );
                firebase
                  .remove(session.docRef, 'lotes', 'lotesDetails', item.id)
                  .then(navigation.goBack);
              });
          }}
        />
      ),
    });
  }, [lote.docRef, pasturas]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Render');
      firebase
        .getDocRefInnerId('lotesDetails', item.id)
        .then(({docRef, data}) => {
          setImages(data.images);
          setPasturas(data.pasturas);
          setLote({docRef, data});
        });
      return () => {};
    }, [item.id, refresh]),
  );

  useEffect(() => {
    AsyncStorage.getItem('recentLotes').then(lotes => {
      const arrayOfLotes = JSON.parse(lotes) || [];
      const arrayWithoutLote = arrayOfLotes.filter(
        prev => prev.lote.id !== item.id,
      );
      item.date = item.creationDate.toDate();
      arrayWithoutLote.push({
        session: {data: session.data, id: session.docRef.id},
        lote: item,
      });
      AsyncStorage.setItem(
        'recentLotes',
        JSON.stringify(arrayWithoutLote.slice(-10)),
      );
    });
  }, []);

  const deleteImage = item => isBefore => () => {
    console.log('Ejecuta borrar');
    alerts.showConfirmDialog('Atencion! Se eliminara la imagen').then(() => {
      imageHandler
        .deletePhoto(item, isBefore ? 'Before' : 'After')
        .then(toggleRefresh);
    });
  };

  const routeWithImage = picker => async () => {
    const imageResponse = await imageHandler.pickImage({docRef: lote.docRef})(
      picker,
    );
    navigation.navigate('Imagen', imageResponse);
  };

  return (
    <DocRefContextProvider docRef={lote.docRef}>
      <BackgroundProvider>
        <View style={styles.detailsContainer}>
          <Info item={item} />
          <Tabs
            secondTitle="Pasturas"
            firstTitle="Imagenes"
            FirstScreen={() => (
              <>
                {!images || images.length === 0 ? (
                  <View style={styles.centeredTextStyle}>
                    <Text>
                      Este lote todavía no tiene imágenes.{'\n'}
                      {'\n'}Podés sacar una foto, cargar una imágen desde la
                      galería, o bien crear una nueva pastura para este lote .
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                <ImagesTaken images={images} deleteImage={deleteImage} />
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
              </>
            )}
            SecondScreen={() => (
              <>
                {!pasturas || pasturas.length === 0 ? (
                  <View style={styles.centeredTextStyle}>
                    <Text>Este lote todavía no tiene pasturas.</Text>
                  </View>
                ) : (
                  <></>
                )}

                <GridWithNewButton
                  newItemText="Nueva pastura"
                  data={pasturas}
                  arrayName="pasturas"
                  detailsCollection="pasturasDetails"
                  refresh={toggleRefresh}
                  defaultObj={{}}
                  nextScreen="PasturasDetails"
                  docRef={lote.docRef}
                  esPastura
                />
              </>
            )}
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
  centeredTextStyle: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = {
  setLote,
};
const mapStateToProps = state => {
  return {lote: state.lote, session: state.session};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withImageHandler(withAlertService(withFirebase(LoteDetails))));
