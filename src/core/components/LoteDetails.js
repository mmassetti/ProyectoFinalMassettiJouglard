//@ts-check
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
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
                '¡Atención! Se eliminará este lote y toda la información asociada a ella. ',
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
          <Info item={lote.data} />
          <Tabs
            secondTitle="Pasturas"
            firstTitle="Imagenes"
            FirstScreen={() => <ImagesTaken images={images} />}
            SecondScreen={() => (
              <GridWithNewButton
                newItemText="Nueva pastura"
                data={pasturas}
                arrayName="pasturas"
                detailsCollection="pasturasDetails"
                refresh={toggleRefresh}
                defaultObj={{}}
                nextScreen="PasturasDetails"
                docRef={lote.docRef}
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
