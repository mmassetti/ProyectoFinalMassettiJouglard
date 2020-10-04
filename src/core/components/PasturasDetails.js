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

function InnerPasturasDetails({
  route,
  navigation,
  imageHandler,
  alertService: alerts,
  firebaseService,
}) {
  const {item, docRef: lotesRef} = route.params;
  const [images, setImages] = useState([]);
  const [docRef, setDocRef] = useState();

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
                  .remove(lotesRef, 'pasturas', 'pasturasDetails', item.id)
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
          setDocRef(docRef);
        });
    }, [item.id]),
  );

  const routeWithImage = picker => async () => {
    const imageResponse = await imageHandler.pickImage({docRef})(picker);
    navigation.navigate('Imagen', imageResponse);
  };

  return (
    <DocRefContextProvider docRef={docRef}>
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

export const PasturasDetail = withAlertService(
  withImageHandler(withFirebase(InnerPasturasDetails)),
);
