import React, {useState, useEffect} from 'react';
import {mainThemeColor} from '../../../configuration';

import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {withFirebase} from '../../../shared';
import SearchInput, {createFilter} from 'react-native-search-filter';
import SessionItem from './SessionItem';
import {Icon} from 'native-base';

function SessionsList({firebaseService}) {
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    firebaseService.getAllSessions().then(sessions => {
      setSessions(sessions);
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
      <FlatList
        data={filteredSession}
        key={({item: {id}}) => id}
        renderItem={SessionItem}
      />
      <TouchableOpacity
        // onPress={this.showEditor(true)}
        style={styles.adjustButton}>
        <Icon name="plus" type="Entypo" style={styles.icon} />
      </TouchableOpacity>
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

export default withFirebase(SessionsList);
