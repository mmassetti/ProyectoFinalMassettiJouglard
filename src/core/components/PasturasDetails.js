import React, {useEffect, useState} from 'react';
import {
  withFirebase,
  withImageHandler,
  withAlertService,
  ImagesTaken,
  BottomRightButton,
  NavDeleteButton,
  DocRefContextProvider,
  Info,
} from '../../shared';
import {Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {setPastura} from '../../store/actions';
import {connect} from 'react-redux';

function InnerPasturasDetails({
  route,
  navigation,
  imageHandler,
  alertService: alerts,
  firebaseService,
  setPastura,
  pastura,
  lote,
}) {
  const {item} = route.params;
  const [images, setImages] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Detalles de la pastura',
      headerRight: () => (
        <NavDeleteButton
          onPress={() => {
            alerts
              .showConfirmDialog(
                '¡Atención! Se eliminará esta pastura y toda la información asociada a ella. ',
              )
              .then(() => {
                firebaseService
                  .remove(lote.docRef, 'pasturas', 'pasturasDetails', item.id)
                  .then(navigation.goBack);
              });
          }}
        />
      ),
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      firebaseService
        .getDocRefInnerId('pasturasDetails', item.id)
        .then(({docRef, data}) => {
          setImages(data.images);
          setPastura({docRef, data});
        });
    }, [item.id]),
  );

  const routeWithImage = picker => async () => {
    const imageResponse = await imageHandler.pickImage({
      docRef: pastura.docRef,
    })(picker);
    navigation.navigate('Imagen', imageResponse);
  };

  return (
    <DocRefContextProvider docRef={pastura.docRef}>
      {/* <Text>{item.description}</Text> */}
      <Info item={item} />
      <ImagesTaken images={images} />
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
    </DocRefContextProvider>
  );
}

const mapStateToProps = state => {
  return {
    session: state.session,
    lote: state.lote,
    pastura: state.pastura,
  };
};
const mapDispatchToProps = {
  setPastura,
};

export const PasturasDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withAlertService(withImageHandler(withFirebase(InnerPasturasDetails))));
