import React, {useEffect, useCallback, useState} from 'react';
import {
  withFirebase,
  withImageHandler,
  withAlertService,
  ImagesTaken,
  BottomRightButton,
  NavDeleteButton,
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
                firebaseService.deletePastura(item);
                navigation.goBack();
              });
          }}
        />
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      item.ref.get().then(doc => {
        const data = doc.data();
        setImages(data.images);
        setPastura({docRef: item.ref, data});
      });
      return () => {};
    }, [item.id, refresh]),
  );

  const routeWithImage = picker => async () => {
    const imageResponse = await imageHandler.pickImage({
      docRef: pastura.docRef,
      prevImages: images,
    })(picker);
    navigation.navigate('Imagen', imageResponse);
  };

  const deleteImage = item => isBefore => () => {
    const message = isBefore
      ? '¡Atencion! Se eliminará tanto la imágen de antes como la de después.'
      : '¡Atencion! Se eliminará la imágen del después';
    alerts.showConfirmDialog(message).then(() => {
      imageHandler.deletePhoto(item, isBefore ? 'Before' : 'After');
      toggleRefresh();
    });
  };

  return (
    <BackgroundProvider>
      <Info item={item} isPastura={true} />
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
