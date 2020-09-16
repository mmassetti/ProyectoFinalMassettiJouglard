import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
import {
  Accordion,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
} from 'native-base';
import {ReadMoreText} from '../../../shared/components/ReadMoreText';

export function SessionHeader({item: {date, user, description, visibility}}) {
  const dataArray = [{title: 'Detalles', content: 'lorem ipsum'}];

  const sessionInfo = () => {
    return (
      <Card style={{flex: 0}}>
        <CardItem>
          <Left>
            <Body>
              <Text>Fecha</Text>
              <Text note>{moment(date.toDate()).format('LL')}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text>Descripción</Text>
            <Text note>{description}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{color: '#87838B'}}>
              <Icon type="FontAwesome" name="user" />
              <Text>creada por: {user}</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
    );
  };

  return (
    // <Content padder>
    //   <Accordion
    //     dataArray={dataArray}
    //     headerStyle={{backgroundColor: '#b7daf8'}}
    //   />
    // </Content>

    <View style={styles.inputContainer}>
      <>
        <Text>
          <Text style={styles.boldText}>Fecha:</Text>{' '}
          {moment(date.toDate()).format('L')}
        </Text>
        <Text>
          <Text style={styles.boldText}>Creada por:</Text> {user}
        </Text>
        <Text>
          <Text style={styles.boldText}>Visibilidad: </Text> {visibility}
        </Text>
        {/* <Text>
          <Text style={styles.boldText}>Descripción: </Text> {description}
        </Text> */}

        <ReadMoreText text={description} style={styles.titleText} />
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
