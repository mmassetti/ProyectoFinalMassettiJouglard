//@ts-check
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  withAlertService,
  withFirebase,
  uniqueId,
  GridWithNewButton,
  DocRefContextProvider,
  NavDeleteButton,
} from '../../../shared';
import {SessionHeader} from './SessionHeader';
import {AlertService} from '../../../shared/services/alertsService';

function SessionDetails({navigation, route, firebaseService, alertService}) {
  const {item, itemId} = route.params;
  const [lotes, setLotes] = useState([]);
  const [docRef, setDocRef] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => setRefresh(prev => !prev);

  useEffect(() => {
    navigation.setOptions({
      title: 'Detalles de la sesión',
      headerRight: () => (
        <NavDeleteButton
          onPress={() => {
            onDeleteSession(route.params.itemId);
          }}
        />
      ),
    });
    async function retrieveDetails() {
      const {docRef, data} = await firebaseService.getDocRefInnerId(
        'sessionsDetails',
        itemId,
      );
      setLotes(data.lotes.reverse() || []);
      setDocRef(docRef);
    }
    retrieveDetails();
  }, [itemId, refresh]);

  async function onDeleteSession(sessionId) {
    AlertService.getInstance()
      .showConfirmDialog(
        '¡Atención! Se eliminará esta sesión y toda la información asociada a ella. ',
      )
      .then(async () => {
        const collectionDelete = firebaseService
          .getDocRefFromId('sessions', sessionId)
          .delete();
        const detailsDelete = docRef?.delete();
        Promise.all([collectionDelete, detailsDelete]).then(() => {
          navigation.navigate('Main');
        });
      });
  }

  return (
    <DocRefContextProvider docRef={docRef}>
      <View style={styles.viewContainer}>
        <SessionHeader item={item} />
        <GridWithNewButton
          title="Lotes"
          data={lotes}
          refresh={toggleRefresh}
          detailsCollection="lotesDetails"
          arrayName="lotes"
          defaultObj={{pasturas: []}}
          nextScreen="LoteDetails"
          docRef={docRef}
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
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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

export default withAlertService(withFirebase(SessionDetails));
