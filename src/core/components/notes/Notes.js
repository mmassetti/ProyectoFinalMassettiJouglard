import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';

import {withFirebase} from '../../../shared/components/HOCForInjection/WithService';
import SingleNote from './SingleNote';

function Notes({notes}) {
  console.log('Notes -> notes', notes);
  let sessionNotes = ['Nota1', 'Nota2', 'Nota3'];
  // const [sessionNotes, setSessionNotes] = useState([notes]);

  const renderItem = ({item, index}) => {
    return (
      <SingleNote
        item={item}
        index={index}
        // onItemPressed={() => goToSessionDetails(item)}
      />
    );
  };

  return (
    <View style={styles.containerStylecontainerStyle}>
      {notes && notes.length > 0 ? (
        <FlatList
          data={sessionNotes}
          key={({item: {id}}) => id}
          renderItem={renderItem}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        />
      ) : (
        <Text>Esta sesión todavía no tiene notas</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
});

export default withFirebase(Notes);
