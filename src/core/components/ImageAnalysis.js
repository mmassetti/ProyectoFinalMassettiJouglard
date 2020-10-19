//@ts-check
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SaveImage, ImageView, Tabs, ImageNotes} from '../../shared';
import {withImageProcessing} from '../../shared';

function ImageAnalysis({route: {params}, imageProcessor}) {
  const onSave = params.onSave;
  const [originalImage, setOriginalImage] = useState(params.originalImage);
  const [processedImage, setProcessedImage] = useState(params.processedImage);
  const [percentages, setPercentages] = useState(params.percentages);

  const updateOriginalImage = async newUri => {
    let {
      percentageGreen,
      percentageYellow,
      percentageNaked,
      img,
    } = await imageProcessor.processImage('file://' + newUri);
    setPercentages({
      percentageGreen,
      percentageYellow,
      percentageNaked,
    });

    setOriginalImage(prev => {
      const newOriginal = prev;
      newOriginal.setUri('file://' + newUri);
    });
    setProcessedImage(prev => {
      const newProcessed = prev;
      newProcessed.setData(img);
    });
  };

  const getImageView = () => (
    <ImageView
      shouldRotate={params.shouldRotate}
      updateOriginalImage={updateOriginalImage}
      originalImage={originalImage}
      processedImage={processedImage}
      percentages={percentages}
    />
  );

  return (
    <View style={styles.container}>
      {onSave ? (
        <Tabs
          FirstScreen={getImageView}
          SecondScreen={() => <ImageNotes />}
          secondTitle="Notas"
          firstTitle="Analisis"
        />
      ) : (
        getImageView()
      )}
      {onSave ? (
        <SaveImage
          image={originalImage}
          percentages={percentages}
          onSave={onSave}
        />
      ) : null}
    </View>
  );
}
export default withImageProcessing(ImageAnalysis);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  information: {
    flex: 1,
  },
  switchContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  switch: {
    width: '80%',
    zIndex: 99,
  },
});
