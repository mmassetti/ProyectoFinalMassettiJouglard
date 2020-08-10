import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {withFirebase} from '../../../shared';
import SearchInput, {createFilter} from 'react-native-search-filter';
import SessionItem from './SessionItem';

function SessionsList({firebaseService}) {
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    firebaseService.getAllSessions().then(sessions => {
      setSessions(sessions.map(session => session.data()));
    });
  }, []);
  const filteredSession = sessions.filter(
    createFilter(searchTerm, ['user', 'description']),
  );
  return (
    <>
      <SearchInput
        onChangeText={setSearchTerm}
        style={styles.searchInput}
        placeholder="Buscar por nombre, descripcion, mes ..."
      />
      <FlatList data={filteredSession} renderItem={SessionItem} />
    </>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
  },
});

export default withFirebase(SessionsList);
