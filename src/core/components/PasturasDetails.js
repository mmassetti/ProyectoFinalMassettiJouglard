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
  BackgroundProvider,
} from '../../shared';
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
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh(prev => !prev);
  };

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
      console.log('Focus');
      firebaseService
        .getDocRefInnerId('pasturasDetails', item.id)
        .then(({docRef, data}) => {
          setImages(data.images);
          setPastura({docRef, data});
        });
      return () => {};
    }, [item.id, refresh]),
  );

  const routeWithImage = picker => async () => {
    const imageResponse = await imageHandler.pickImage({
      docRef: pastura.docRef,
    })(picker);
    navigation.navigate('Imagen', imageResponse);
  };

  const deleteImage = item => isBefore => () => {
    alerts.showConfirmDialog('Atencion! Se eliminara la imagen').then(() => {
      imageHandler
        .deletePhoto(item, isBefore ? 'Before' : 'After')
        .then(toggleRefresh);
    });
  };

  return (
    <DocRefContextProvider docRef={pastura.docRef}>
      <BackgroundProvider>
        <Info item={item} />
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
      </BackgroundProvider>
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
