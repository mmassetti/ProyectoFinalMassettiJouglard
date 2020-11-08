//@ts-check
import React, {Component} from 'react';
import {StyleSheet, Linking} from 'react-native';

import {
  Container,
  Header,
  Content,
  Icon,
  Accordion,
  Text,
  View,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HyperLink from 'react-native-hyperlink';
const dataArray = [
  {
    title: '¿Cúal es la página web para ver la info de la app?',
    content: (
      <HyperLink linkDefault={true} linkStyle={{color: 'blue'}}>
        <Text>La web es: https://holajj.vercel.app</Text>
      </HyperLink>
    ),
  },
  {
    title: '¿Qué puedo hacer en esta app?',
    content: (
      <Text>
        Con esta app podrás determinar el porcentaje de cubrimiento de un suelo.
        Para ello podés elegir entre un{' '}
        <Text style={{fontWeight: 'bold'}}>'Proceso rápido'</Text>, donde la
        aplicación simplemente te dirá los resultados para la imágen elegida, y
        un manejo de <Text style={{fontWeight: 'bold'}}>'Sesiones'</Text>, donde
        los resultados se almacenarán para poder ser accedidos en cualquier
        momento. Una <Text style={{fontWeight: 'bold'}}>Sesión</Text> tiene{' '}
        <Text style={{fontWeight: 'bold'}}>lotes</Text>. En el lote podrás
        cargar <Text style={{fontWeight: 'bold'}}>imágenes sueltas</Text> o bien{' '}
        <Text style={{fontWeight: 'bold'}}>pasturas</Text>, que tendrán asimismo
        imágenes. {'\n'}
        {'\n'}A la hora de cargar una imágen, ya sea utilizando la cámara o la
        galería de tu celular, podrás{' '}
        <Text style={{fontWeight: 'bold'}}>
          ajustar brillo, saturación y contraste{' '}
        </Text>
        , para mejorar la calidad de la foto ante una falta de luz adecuada, por
        ejemplo. También podrás{' '}
        <Text style={{fontWeight: 'bold'}}>hacer zoom</Text> a la imágen, para
        detectar cualquier detalle que no aparezca a simple vista. {'\n'}
        {'\n'}Además de los{' '}
        <Text style={{fontWeight: 'bold'}}>
          porcentajes de vivo, desnudo y sin cubrir
        </Text>{' '}
        para cada imágen, podrás ver el{' '}
        <Text style={{fontWeight: 'bold'}}>promedio </Text>de cubrimiento para
        cada lote y pastura. Por otro lado, podrás hacer una comparación entre
        imágenes{' '}
        <Text style={{fontWeight: 'bold'}}>
          antes y después de algún ajuste{' '}
        </Text>
        que quieras realizar a la hora de sacar la foto (como puede ser un
        recorte de pastos).{'\n'}
        {'\n'}Por último, podrás agregar{' '}
        <Text style={{fontWeight: 'bold'}}>notas </Text>, ya sea al momento de
        cargar una nueva imágen, donde podrás destacar lo que consideres
        necesario (altura de los pastos, anomalías, etc) o bien posteriormente,
        donde podrás agregar lo que consideres para la sesión en que estés
        trabajando.
      </Text>
    ),
  },
  {
    title: '¿Qué puedo hacer en la web?',
    content: (
      <Text>
        En la web podrás ver toda la información de las sesiones de una manera
        mas organizada y gráfica. {'\n'}Además, podrás{' '}
        <Text style={{fontWeight: 'bold'}}>
          descargar informes en formato CSV o PDF{' '}
        </Text>
        con la información asociada a todas las sesiones o a alguna en
        particular. {'\n'}Por otro lado, podrás
        <Text style={{fontWeight: 'bold'}}> editar</Text> descripciones de las
        sesiones, lotes y pasturas, como así también las notas.{'\n'}A
        diferencia de esta aplicación móvil, en la página web no permitiremos
        eliminar sesiones, lotes, pasturas, imágenes o notas, hasta que no se
        implemente el sistema de Registro y Logueo de usuarios
      </Text>
    ),
  },
];

function InfoHelp({navigation}) {
  const renderHeader = (item, expanded) => {
    return (
      <View style={styles.headerStyle}>
        <Text style={{fontWeight: 'bold', paddingRight: 5}}> {item.title}</Text>

        {expanded ? (
          <Icon
            style={{fontSize: 18, position: 'absolute', right: 0, padding: 10}}
            name="minus-circle"
            type="FontAwesome5"
          />
        ) : (
          <Icon
            style={{fontSize: 18, position: 'absolute', right: 0, padding: 10}}
            name="plus-circle"
            type="FontAwesome5"
          />
        )}
      </View>
    );
  };

  const renderContent = item => {
    return <Text style={styles.contentStyle}>{item.content}</Text>;
  };

  return (
    <Container>
      <Content padder style={{backgroundColor: 'white'}}>
        <Accordion
          dataArray={dataArray}
          expanded={0}
          renderHeader={renderHeader}
          renderContent={renderContent}
        />
      </Content>
    </Container>
  );
}
export default InfoHelp;

const styles = StyleSheet.create({
  headerStyle: {
    padding: 10,
    backgroundColor: '#A9DAD6',
    position: 'relative',
  },
  contentStyle: {
    backgroundColor: '#e3f1f1',
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
