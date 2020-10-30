//@ts-check
import React, {useState, useEffect} from 'react';

import {StyleSheet, View, TextInput, Switch} from 'react-native';
import {
  Button,
  Text,
  Form,
  Item,
  Input as NativeInput,
  Label,
} from 'native-base';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import 'moment/locale/es';
import {withFirebase, Input} from '../../../shared';
import {connect} from 'react-redux';

function NewSession(props) {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [createdBy, setCreatedBy] = useState(props.userName);
  const [switchValue, setSwitchValue] = useState(true);

  const toggleSwitch = value => {
    setSwitchValue(value);
  };

  useEffect(() => {}, []);

  const showDatePicker = () => {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <Label style={{marginBottom: 10}}>Fecha de creacion</Label>
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
      </View>
    );
  };

  const showDescription = () => {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <Label>Descripcion</Label>
        <Input
          // autoFocus
          placeholder="Escribir una breve descripción de la sesión..."
          value={description}
          onChange={setDescription}
        />
      </View>
    );
  };
  const showName = () => {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <Label>Nombre de la sesion</Label>
        <Input
          // autoFocus
          placeholder="Escribir un nombre..."
          maxLength={20}
          value={sessionName}
          onChange={setSessionName}
        />
      </View>
    );
  };
  const showCreatedBy = () => {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <Label>Creada por</Label>
        <Item>
          <NativeInput
            maxLength={15}
            value={createdBy}
            onChangeText={setCreatedBy}
          />
        </Item>
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
  function shouldDisableButton() {
    return !createdBy.length || !description.length;
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
      .addObjToCollection('sessionsDetails', {
        ...sessionData,
        lotes: [],
        notes: [],
      })
      .then(doc => {
        props.firebaseService
          .addObjToCollection('sessions', {
            ...sessionData,
            ref: doc,
          })
          .then(simpleDoc =>
            goToSessionDetails({...sessionData, ref: doc}, simpleDoc.id),
          );
      });
  }

  const showButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          primary
          onPress={createSession}
          disabled={shouldDisableButton()}>
          <Text style={styles.buttonText}>Crear sesión</Text>
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.viewContainer}>
      <Text
        style={{
          marginTop: 10,
          fontSize: 20,
          fontWeight: 'bold',
          paddingBottom: 10,
          borderColor: '#aaa',
          borderBottomWidth: 2,
          marginBottom: 30,
        }}>
        Formulario para crear nueva sesion
      </Text>
      <Form
        style={{
          width: '90%',
          flex: 3,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {showDatePicker()}
        {showCreatedBy()}
        {showDescription()}
      </Form>
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
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 5,
    marginTop: 20,
  },

  textAreaContainer: {
    marginTop: 10,
    padding: 5,
    width: '100%',
  },
  description: {
    height: 150,
    justifyContent: 'flex-start',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 35,
    alignItems: 'center',
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
