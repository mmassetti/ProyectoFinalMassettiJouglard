//@ts-check
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {
  BackgroundProvider,
  BottomRightButton,
  DocRefContextProvider,
  GridWithNewButton,
  ImagesTaken,
  Info,
  Tabs,
  useRecentLotes,
  withAlertService,
  withFirebase,
  withImageHandler,
} from '../../shared';
import {NavDeleteButton} from '../../shared/components/NavDeleteButton';
import {setLote, setPastura} from '../../store/actions';

function LoteDetails({
  firebaseService: firebase,
  alertService: alerts,
  navigation,
  lote,
  session,
  setLote,
  setPastura,
  route,
  imageHandler,
}) {
  const [images, setImages] = useState([]);
  const [pasturas, setPasturas] = useState([]);
  const {item} = route.params;
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh(prev => !prev);
  const [, removeLoteFromStorage, , addLoteToStorage] = useRecentLotes();

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
                // @ts-ignore
                removeLoteFromStorage(item.id);
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
      setPastura({});
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
    addLoteToStorage(session, item);
  }, []);

  const deleteImage = item => isBefore => () => {
    const message = isBefore
      ? 'Atencion! Se eliminara tanto la imagen de antes como la de despues.'
      : 'Atencion! Se eliminar la imagen del despues';
    alerts.showConfirmDialog(message).then(() => {
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
            secondTitle={`Pasturas (${pasturas.length})`}
            firstTitle={`Imagenes (${images.length})`}
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
                  customDelete={id => {
                    const pasturaToDelete = pasturas.find(
                      pastura => pastura.id == id,
                    );
                    imageHandler.deletePasturaPercentageFromLote(
                      pasturaToDelete,
                    );
                  }}
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
  setPastura,
};
const mapStateToProps = state => {
  return {lote: state.lote, session: state.session};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withImageHandler(withAlertService(withFirebase(LoteDetails))));
