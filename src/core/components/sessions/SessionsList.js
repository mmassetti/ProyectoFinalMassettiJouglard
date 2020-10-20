import React, {useState} from 'react';
import {mainThemeColor} from '../../../configuration';

import {StyleSheet, FlatList, RefreshControl, View, Text} from 'react-native';
import {
  withFirebase,
  withSessionsService,
  BottomRightButton,
} from '../../../shared';
import SearchInput, {createFilter} from 'react-native-search-filter';
import SessionItem from './SessionItem';
import {useFocusEffect} from '@react-navigation/native';

function SessionsList(props) {
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
      return () => {};
    }, [props.firebaseService]),
  );

  const filteredSession = sessions.filter(
    createFilter(searchTerm, ['user', 'description']),
  );

  function goToNewSession() {
    props.navigation.navigate('NewSession', {});
  }

  function goToSessionDetails(item) {
    props.navigation.navigate('SessionDetails', {
      item: item.data(),
      itemId: item.id,
    });
  }

  const renderItem = ({item, index}) => {
    return (
      <SessionItem
        item={item}
        index={index}
        onItemPressed={() => goToSessionDetails(item)}
      />
    );
  };

  function onRefresh() {
    setRefreshing(true);
    props.firebaseService.getAll('sessions').then(sessions => {
      setSessions(sessions.docs);
      setRefreshing(false);
    });
  }

  return (
    <>
      {sessions && sessions.length > 0 ? (
        <>
          <SearchInput
            onChangeText={setSearchTerm}
            style={styles.searchInput}
            placeholder="Buscar por nombre, descripción, mes ..."
          />

          <FlatList
            data={filteredSession}
            key={({item: {id}}) => id}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            onEndReached={console.log}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </>
      ) : (
        <View style={styles.centeredTextStyle}>
          <Text>
            {'\n'}
            <Text style={styles.boldTitle}>
              ¡Todavía no hay ninguna sesión creada!{'\n'}
            </Text>
            {'\n'}Podés crear una presionando el botón de la parte inferior
            derecha.
          </Text>
        </View>
      )}

      <BottomRightButton
        buttons={[
          {
            name: 'plus',
            type: 'Entypo',
            onPress: goToNewSession,
          },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  adjustButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: mainThemeColor(1),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
  },
  icon: {
    color: 'white',
  },
  centeredTextStyle: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default withSessionsService(withFirebase(SessionsList));
