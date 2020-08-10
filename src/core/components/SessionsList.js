import React, { useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {withFirebase} from '../../shared';

function SessionsList({firebaseService}) {
  const [sessions, setSessions] = useState([]);

  useEffect(async () => {
    const sessions = await firebaseService.getSessions();
    setSessions(sessions);
    return null;
  });
  return <FlatList data={sessions} renderItem={}/>;
}

export default withFirebase(SessionsList);

