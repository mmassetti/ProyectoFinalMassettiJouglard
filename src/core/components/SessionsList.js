import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { withFirebase } from "../../shared";
import SearchInput, { createFilter } from "react-native-search-filter";

function SessionsList({ firebaseService }) {
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(async () => {
    const sessions = await firebaseService.getSessions();
    setSessions(sessions);
    return null;
  });
  const filteredSession = sessions.filter(
    createFilter(searchTerm, ['user', 'description'])
  );
  return (
    <>
      <SearchInput
        onChangeText={setSearchTerm}
        style={styles.searchInput}
        placeholder="Buscar por nombre, descripcion, mes ..."
      />
      <FlatList data={filteredSession} renderItem={} />
    </>
  );
}

export default withFirebase(SessionsList);
