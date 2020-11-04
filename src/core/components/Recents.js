import {useFocusEffect, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';
import React, {useState} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {lightGray} from '../../configuration/colors';
import {withFirebase, useRecentLotes} from '../../shared';
import {setSession} from '../../store/actions';

function InnerRecents({firebaseService}) {
  const [recentLotes, setLotes] = useState([]);
  const [recentsStorage, removeLoteFromArray] = useRecentLotes();

  useFocusEffect(
    React.useCallback(() => {
      recentsStorage().then(lotes => {
        const lotesPromises = lotes.map(item => {
          const sessionRef = firebaseService.getDocRefFromId(
            'sessionsDetails',
            item.session.id,
          );
          const loteRef = firebaseService.getDocRefFromId(
            'lotesDetails',
            item.lote.id,
          );
          const sessionPromise = sessionRef.get();
          const lotesPromise = loteRef.get();
          return Promise.all([sessionPromise, lotesPromise])
            .then(([sessionData, loteData]) => {
              if (!sessionData.exists || !loteData.exists)
                removeLoteFromArray(item.lote.id);
              return {
                session: {docRef: sessionRef, data: sessionData.data()},
                lote: {docRef: loteRef, data: loteData.data()},
              };
            })
            .catch(err => {
              console.log('ERR', err);
              removeLoteFromArray(item.lote.id);
            });
        });
        Promise.all(lotesPromises).then(lotes => {
          setLotes(lotes.reverse());
        });
      });
    }, []),
  );
  return (
    <>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 10,
          textDecorationLine: 'underline',
          marginBottom: 20,
          fontSize: 18,
        }}>
        Lotes accedidos recientemente
      </Text>
      <FlatList
        keyExtractor={item => item.lote.id}
        data={recentLotes}
        renderItem={({item, index}) => {
          return <RecentEntry item={item} index={index} />;
        }}
      />
    </>
  );
}

function InnerRecentEntry({item: {session, lote}, index, setSession}) {
  const navigation = useNavigation();
  const navigate = () => {
    const docRef = session.docRef;
    setSession({docRef, data: session.data});
    lote.data.creationDate.toDate = () => lote.date;
    navigation.navigate('LoteDetails', {
      item: {...lote.data, ref: lote.docRef},
    });
  };

  return (
    <TouchableOpacity
      key={lote.docRef.id}
      onPress={navigate}
      style={{
        height: Dimensions.get('window').height * 0.1,
        flexDirection: 'row',
        backgroundColor: index % 2 ? lightGray : 'white',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
      }}>
      <View style={{justifyContent: 'space-evenly', width: '100%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {lote.data.description}
        </Text>
        <Text style={{color: 'grey', fontWeight: 'bold'}}>
          Creado el {moment(lote.date).format('L')}
        </Text>
        <Text numberOfLines={1} style={{maxWidth: '90%'}}>
          Sesion: {session.data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const mapDispatchToProps = {
  setSession,
};
export const Recents = withFirebase(InnerRecents);
const RecentEntry = connect(
  null,
  mapDispatchToProps,
)(withFirebase(InnerRecentEntry));
