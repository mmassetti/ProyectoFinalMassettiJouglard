import React, {useEffect, useState} from 'react';
import {
  withFirebase,
  withImageHandler,
  ImagesTaken,
  BottomRightButton,
  NavDeleteButton,
  DocRefContextProvider,
} from '../../shared';
import {Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

function InnerPasturasDetails({
  route,
  navigation,
  imageHandler,
  firebaseService,
}) {
  const {item} = route.params;
  const [images, setImages] = useState([]);
  const [docRef, setDocRef] = useState();

  useEffect(() => {
    navigation.setOptions({
      title: 'Detalles de la pastura',
      headerRight: () => (
        <NavDeleteButton
          onPress={() => {
            // onDeleteLote(route.params.itemId);
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
      <Text>{item.description}</Text>
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

export const PasturasDetail = withImageHandler(
  withFirebase(InnerPasturasDetails),
);
