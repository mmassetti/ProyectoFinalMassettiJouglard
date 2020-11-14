//@ts-check
import React, {useState, useEffect} from 'react';

import {StyleSheet, View} from 'react-native';
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
import {uuidv4 as uniqueId} from '../../../shared/services/uuidService';

function NewSession(props) {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState(props.userName);

  useEffect(() => {}, []);

  const showDatePicker = () => {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <Label style={{marginBottom: 10, fontWeight: 'bold'}}>
          Fecha de creación:
        </Label>
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
        <Label style={{fontWeight: 'bold'}}>Descripción</Label>
        <Input
          placeholder="Escribir una breve descripción de la sesión..."
          value={description}
          onChange={setDescription}
        />
      </View>
    );
  };

  const showCreatedBy = () => {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <Label style={{fontWeight: 'bold'}}>Creada por:</Label>
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
    const id = uniqueId();
    const sessionData = {
      active: true,
      date: date,
      description: description,
      user: createdBy,
      id,
    };
    props.firebaseService.addObjToCollection('sessionsDetails', {
      ...sessionData,
      lotes: [],
      notes: [],
    });
    setTimeout(() => {
      props.firebaseService
        .getDocRefInnerId('sessionsDetails', id)
        .then(({docRef: doc}) => {
          props.firebaseService.addObjToCollection('sessions', {
            ...sessionData,
            ref: doc,
          });
          setTimeout(() => {
            props.firebaseService
              .getDocRefInnerId('sessions', id)
              .then(({docRef: simpleDoc}) =>
                goToSessionDetails({...sessionData, ref: doc}, simpleDoc.id),
              );
          }, 0);
        });
    }, 0);
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
          paddingLeft: 10,
        }}>
        Formulario para crear nueva sesión
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
});
function mapStateToProps(state) {
  return {userName: state.userName};
}

export default connect(mapStateToProps)(withFirebase(NewSession));
