import React, {useState, useEffect} from 'react';
import {mainThemeColor} from '../../../configuration';

import {StyleSheet, FlatList, RefreshControl} from 'react-native';
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
    props.firebaseService.getAll('sessions').then(sessionsList => {
      setSessions(
        sessionsList.sort(props.sessionsService.compareSessionsByDate),
      );
      setRefreshing(false);
    });
  }

  return (
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

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
});

export default withSessionsService(withFirebase(SessionsList));
