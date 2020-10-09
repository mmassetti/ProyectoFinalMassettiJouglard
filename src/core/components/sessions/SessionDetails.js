//@ts-check
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  withAlertService,
  withFirebase,
  GridWithNewButton,
  DocRefContextProvider,
  NavDeleteButton,
  Tabs,
} from '../../../shared';
import {SessionHeader} from './SessionHeader';
import {useFocusEffect} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';
import {setSession} from '../../../store/actions';
import {connect} from 'react-redux';
import {Text} from 'native-base';

function SessionDetails({
  navigation,
  setSession,
  session,
  route,
  firebaseService,
  alertService,
}) {
  const {item, itemId} = route.params;
  const [lotes, setLotes] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => setRefresh(prev => !prev);

  useFocusEffect(
    React.useCallback(() => {
      async function retrieveDetails() {
        const {docRef, data} = await firebaseService.getDocRefInnerId(
          'sessionsDetails',
          itemId,
        );
        setLotes(data.lotes.reverse() || []);
        setSession({docRef, data});
      }
      retrieveDetails();
      return () => {};
    }, [itemId, refresh]),
  );

  useEffect(() => {
    const onDeleteSession = sessionId => {
      alertService
        .showConfirmDialog(
          '¡Atención! Se eliminará esta sesión y toda la información asociada a ella. ',
        )
        .then(async () => {
          const collectionDelete = firebaseService
            .getDocRefFromId('sessions', sessionId)
            .delete();
          const detailsDelete = session.docRef?.delete();
          firebaseService.deleteInBatch(
            lotes.map(lote => lote.id),
            'lotesDetails',
          );
          Promise.all([collectionDelete, detailsDelete]).then(() => {
            navigation.navigate('Main');
          });
        });
    };
    navigation.setOptions({
      title: 'Detalles de la sesión',
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            navigation.navigate('Main');
          }}
        />
      ),
      headerRight: () => (
        <NavDeleteButton
          onPress={() => {
            onDeleteSession(route.params.itemId);
          }}
        />
      ),
    });
  }, [lotes, session]);

  return (
    <DocRefContextProvider docRef={session.docRef}>
      <View style={styles.viewContainer}>
        <SessionHeader item={item} />
        <Tabs
          firstTitle="Lotes"
          secondTitle="Notas"
          FirstScreen={() => (
            <GridWithNewButton
              newItemText="Nuevo lote"
              data={lotes}
              refresh={toggleRefresh}
              detailsCollection="lotesDetails"
              arrayName="lotes"
              defaultObj={{pasturas: []}}
              nextScreen="LoteDetails"
              docRef={session.docRef}
            />
          )}
          SecondScreen={() => <Text>Componentes notas</Text>}
        />
      </View>
    </DocRefContextProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    width: '100%',
  },
  lotesContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
  lotesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewContainer: {
    // flex: 1,
    // width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
    zIndex: 10,
  },

  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: 'white',
  },
  inputContainer: {
    marginTop: 20,
  },
});

const mapDispatchToProps = {
  setSession,
};
const mapStateToProps = state => {
  return {session: state.session};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withAlertService(withFirebase(SessionDetails)));
