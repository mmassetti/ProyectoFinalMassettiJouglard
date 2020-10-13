import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';
import React, {useState} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {lightGray} from '../../configuration/colors';
import {withFirebase} from '../../shared';
import {setSession} from '../../store/actions';

export function Recents() {
  const [recentLotes, setLotes] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('recentLotes').then(lotes => {
        setLotes(JSON.parse(lotes).reverse());
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
        renderItem={RecentEntry}
      />
    </>
  );
}

function InnerRecentEntry({item, index, firebaseService, setSession}) {
  const navigation = useNavigation();
  const navigate = () => {
    const docRef = firebaseService.getDocRefFromId(
      'sessionDetails',
      item.session.id,
    );
    setSession({docRef, data: item.session.data});
    item.lote.creationDate.toDate = () => item.lote.date;
    navigation.navigate('LoteDetails', {item: item.lote});
  };

  return (
    <TouchableOpacity
      key={item.lote.id}
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
          {item.lote.description}
        </Text>
        <Text style={{color: 'grey', fontWeight: 'bold'}}>
          Creado el {moment(item.lote.date).format('L')}
        </Text>
        <Text numberOfLines={1} style={{maxWidth: '90%'}}>
          Sesion: {item.session.data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const mapDispatchToProps = {
  setSession,
};

const RecentEntry = withFirebase(
  connect(
    null,
    mapDispatchToProps,
  )(InnerRecentEntry),
);
