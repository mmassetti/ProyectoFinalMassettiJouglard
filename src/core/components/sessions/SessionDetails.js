//@ts-check
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, BackHandler} from 'react-native';
import {
  withAlertService,
  withFirebase,
  GridWithNewButton,
  DocRefContextProvider,
  NavDeleteButton,
  Tabs,
  useRecentLotes,
} from '../../../shared';
import {SessionHeader} from './SessionHeader';
import {useFocusEffect} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';
import {setSession, setLote} from '../../../store/actions';
import {connect} from 'react-redux';
import Notes from '../notes/Notes';
import firestore from '@react-native-firebase/firestore';
import {uuidv4} from '../../../shared/services/uuidService';

function SessionDetails({
  navigation,
  setSession,
  setLote,
  session,
  route,
  firebaseService,
  alertService,
}) {
  const {item, itemId} = route.params;
  const [lotes, setLotes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [removeLote, removeLotes] = useRecentLotes();
  const toggleRefresh = () => setRefresh(prev => !prev);

  const retrieveDetails = async () => {
    let data;
    try {
      data = (await item.ref.get()).data();
    } catch (e) {
      console.log('Error', e);
    } finally {
      setSession({docRef: item.ref, data});
      setLotes(data?.lotes.reverse() || []);
    }
  };

  useEffect(() => {
    firebaseService
      .setDummyReference(item.ref, {lotes: [], notes: []})
      .then(() => {
        setLote({});
        retrieveDetails();
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setLote({});
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
          firebaseService.deleteSession(session);
          firebaseService.getDocRefFromId('sessions', itemId).delete();
          // @ts-ignore
          removeLotes(lotes.map(lote => lote.id));
          navigation.navigate('Main');
        });
    };
    const navigateBack = () => {
      if (navigation.isFocused('SessionDetails')) {
        navigation.navigate('Main');
        return true;
      }
      return false;
    };
    BackHandler.addEventListener('hardwareBackPress', navigateBack);
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
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', navigateBack);
    };
  }, [lotes, session]);

  return (
    <DocRefContextProvider docRef={session.docRef}>
      <View style={styles.viewContainer}>
        <SessionHeader item={item} />
        <Tabs
          firstTitle={`Lotes (${lotes.length})`}
          secondTitle={`Notas (${
            session.data ? session.data.notes.length : 0
          })`}
          FirstScreen={() => (
            <>
              {!lotes || lotes.length === 0 ? (
                <View style={styles.centeredTextStyle}>
                  <Text>Esta sesión todavía no tiene lotes.</Text>
                </View>
              ) : (
                <></>
              )}

              <GridWithNewButton
                newItemText="Nuevo lote"
                data={lotes}
                refresh={toggleRefresh}
                detailsCollection="lotesDetails"
                // @ts-ignore
                customDelete={item => {
                  firebaseService.deleteLote({...item, pasturas: []});
                  toggleRefresh();
                  // // @ts-ignore
                  // removeLote(item.id);
                }}
                arrayName="lotes"
                defaultObj={{pasturas: []}}
                nextScreen="LoteDetails"
                docRef={item.ref}
              />
            </>
          )}
          SecondScreen={() => (
            <Notes
              notes={session.data?.notes || []}
              docRef={session.docRef}
              refresh={toggleRefresh}
            />
          )}
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
  centeredTextStyle: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = {
  setSession,
  setLote,
};
const mapStateToProps = state => {
  return {session: state.session};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withAlertService(withFirebase(SessionDetails)));
