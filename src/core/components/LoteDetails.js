//@ts-check
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {
  BackgroundProvider,
  BottomRightButton,
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
    setImages(lote.data?.images || []);
    setPasturas(lote.data?.pasturas || []);
  }, [lote]);

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
                firebase.deleteLote({...item, pasturas});
                // @ts-ignore
                removeLoteFromStorage(item.id);
                navigation.goBack();
              });
          }}
        />
      ),
    });
  }, [lote.docRef, pasturas]);

  useFocusEffect(
    React.useCallback(() => {
      setPastura({});
      item.ref.get().then(data => {
        const info = data.data();
        setLote({docRef: item.ref, data: info});
      });
      return () => {};
    }, [item.id, refresh]),
  );

  useEffect(() => {
    addLoteToStorage(session, item);
    return () => {};
  }, []);

  const deleteImage = item => isBefore => () => {
    const message = isBefore
      ? '¡Atención! Se eliminará tanto la imágen del antes como la del después (en caso de existir).'
      : '¡Atención! Se eliminará la imágen del después';
    alerts.showConfirmDialog(message).then(() => {
      imageHandler.deletePhoto(item, isBefore ? 'Before' : 'After');
      toggleRefresh();
    });
  };

  const routeWithImage = picker => async () => {
    const imageResponse = await imageHandler.pickImage({
      docRef: lote.docRef,
      prevImages: images,
    })(picker);
    navigation.navigate('Imagen', imageResponse);
  };

  return (
    <BackgroundProvider>
      <View style={styles.detailsContainer}>
        <Info item={item} />
        <Tabs
          secondTitle={`Pasturas (${pasturas.length})`}
          firstTitle={`Imágenes (${images.length})`}
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
                customDelete={item => {
                  imageHandler.deletePasturaPercentageFromLote(item);
                  firebase.deletePastura(item);
                  toggleRefresh();
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
