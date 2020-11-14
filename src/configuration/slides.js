export const slides = [
  {
    key: 's1',
    title: 'Bienvenidos',
    text:
      'Esta app te ayudará a determinar el porcentaje de cobertura que presenta un suelo.',
    image: require('../guided-tour/assets/Logo.png'),
    backgroundColor: '#3395ff',
  },
  {
    key: 's2',
    title: 'Sesiones',
    text:
      'En la pantalla principal encontrarás todas las sesiones creadas. Podrás buscar sesiones por nombre o usuario. También podrás crear una nueva sesión.',
    image: require('../guided-tour/assets/Sessions.jpeg'),
    backgroundColor: '#DB6C79',
  },
  {
    key: 's3',
    title: 'Detalle de la sesión',
    text:
      'Al ingresar a una de las sesiones podrás ver sus detalles, lotes y notas.',
    image: require('../guided-tour/assets/SessionDetails.jpeg'),
    backgroundColor: '#DB6C79',
  },
  {
    key: 's4',
    title: 'Lote',
    text:
      'Todas las sesiones tienen lotes. Al ingresar a alguno de ellos podrás ver las imágenes y pasturas asociadas a dicho lote, como así también su promedio.',
    image: require('../guided-tour/assets/LoteDetails.jpeg'),
    backgroundColor: '#DB6C79',
  },
  {
    key: 's5',
    title: 'Cargar una imagen',
    text:
      'En cada lote o pastura, podrás seleccionar una imagen desde la galería o tomar una foto en el momento utilizando la cámara.',
    image: require('../guided-tour/assets/LoadImage.jpeg'),
    backgroundColor: '#DB6C79',
  },
  {
    key: 's6',
    title: 'Recomendaciones al sacar la foto',
    text:
      '¡Siguiendo estos consejos la comparación entre imágenes será más precisa!',
    image: require('../guided-tour/assets/Recommendations.png'),
    backgroundColor: '#DB6C79',
  },
  {
    key: 's7',
    title: 'Porcentajes',
    text:
      'Obtendrás el porcentaje de suelo que este cubierto con vegetación viva, seca o se encuentre sin cubrir. Además, podrás hacer zoom, retocar la imagen y agregar anotaciones.',
    image: require('../guided-tour/assets/ImageResultsZoomAndEdit.jpeg'),
    backgroundColor: '#DB6C79',
  },
  {
    key: 's8',
    title: 'Imagen procesada',
    text:
      'Aquí podrás observar qué partes de la imagen han sido detectadas como vegetación. Los sectores que aparecen en negro son detectados como suelo desnudo. También podrás observar la imagen original.',
    image: require('../guided-tour/assets/ProcessedImage.png'),
    backgroundColor: '#DB6C79',
  },
  {
    key: 's9',
    title: 'Ajustes',
    text:
      'En los ajustes podrás modificar el brillo, saturación y contraste de la imagen, con el fin de poder mejorarla. Luego de presionar "Confirmar", se realizará nuevamente el procesamiento.',
    image: require('../guided-tour/assets/Adjustment.jpg'),
    backgroundColor: '#DB6C79',
  },
  {
    key: 's10',
    title: 'Antes y después',
    text:
      'Para cada imagen tendrás la posibilidad de cargar otra luego de, por ejemplo, hacer un recorte de la vegetación. De esta forma podrás llevar registro de la diferencia antes y despúes del recorte',
    image: require('../guided-tour/assets/BeforeAfter.jpeg'),
    backgroundColor: '#DB6C79',
  },

  {
    key: 's11',
    title: 'Reciente',
    text:
      'En esta pantalla estarán los últimos diez lotes que fueron accedidos recientemente.',
    image: require('../guided-tour/assets/RecentLotes.jpeg'),
    backgroundColor: '#FEBE29',
  },
  {
    key: 's12',
    title: 'Proceso rápido',
    text:
      'Por último, podrás hacer un análisis rápido de la cobertura del suelo, sin necesidad de crear una sesión. En este caso no se guardarán los resultados del procesamiento.',
    image: require('../guided-tour/assets/FastProcess.jpeg'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 's13',
    title: 'Página web',
    text:
      'Creamos una web desde donde podrás ver los resultados de las sesiones, editar información y descargar informes en formato CSV y PDF. Podes visitarla en: cgsweb.vercel.app',
    image: require('../guided-tour/assets/WebHome.jpeg'),
    backgroundColor: '#3395ff',
  },
];
