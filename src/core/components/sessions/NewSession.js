//@ts-check
import React, {useState, useEffect} from 'react';

import {StyleSheet, View, TextInput, Switch} from 'react-native';
import {Button, Text} from 'native-base';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import 'moment/locale/es';
import {withFirebase} from '../../../shared';
import {connect} from 'react-redux';

function NewSession(props) {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');

  const [switchValue, setSwitchValue] = useState(true);

  const toggleSwitch = value => {
    setSwitchValue(value);
  };

  useEffect(() => {}, []);

  const showDatePicker = () => {
    return (
      <DatePicker
        style={{width: 200, marginBottom: 15}}
        date={date}
        mode="date"
        placeholder="Elegir fecha"
        format="DD-MM-YYYY"
        confirmBtnText="OK"
        cancelBtnText="Cancelar"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
        }}
        onDateChange={date => {
          const stringToDate = moment(date, 'DD-MM-YYYY').toDate();
          setDate(stringToDate);
        }}
      />
    );
  };

  const showVisibility = () => {
    return (
      <View style={styles.visibility}>
        <Text>
          {switchValue ? 'Visibilidad PÚBLICA' : 'Visibilidad PRIVADA'}
        </Text>

        <Switch onValueChange={toggleSwitch} value={switchValue} />
      </View>
    );
  };

  const showDescription = () => {
    return (
      <View style={styles.textAreaContainer}>
        <TextInput
          // autoFocus
          underlineColorAndroid="transparent"
          placeholder="Escribir una breve descripción de la sesión..."
          placeholderTextColor="grey"
          style={styles.description}
          onChangeText={text => setDescription(text)}
          value={description}
          multiline={true}
          numberOfLines={10}
        />
      </View>
    );
  };

  function goBackToSessions() {
    const {navigation} = props;
    navigation.goBack();
  }

  function goToSessionDetails(sessionData, id) {
    const {navigation} = props;
    navigation.navigate('SessionDetails', {
      item: sessionData,
      itemId: id,
    });
  }

  function createSession() {
    const sessionData = {
      active: true,
      date: date,
      description: description,
      user: props.userName,
      visibility: switchValue ? 'Pública' : 'Privada',
    };
    return props.firebaseService
      .addObjToCollection('sessions', sessionData)
      .then(doc => {
        let id;
        const addToSessionDetails = props.firebaseService
          .addObjToCollection('sessionsDetails', {
            ...sessionData,
            lotes: [],
            id: doc.id,
          })
          .then(goToSessionDetails(sessionData, id));
        // .then(goBackToSessions);
      });
  }

  const showButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} primary onPress={() => createSession()}>
          <Text style={styles.buttonText}>Crear sesión</Text>
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.viewContainer}>
      <View style={styles.inputContainer}>
        <React.Fragment>
          {showVisibility()}
          {showDatePicker()}
          {showDescription()}
        </React.Fragment>
      </View>
      {showButtons()}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 5,
    marginTop: 20,
  },

  textAreaContainer: {
    marginTop: 10,
    borderWidth: 1,
    padding: 5,
  },
  description: {
    height: 150,
    justifyContent: 'flex-start',
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
  visibility: {
    flexDirection: 'row',
    marginBottom: 15,
  },
});
function mapStateToProps(state) {
  return {userName: state.userName};
}

export default connect(mapStateToProps)(withFirebase(NewSession));
