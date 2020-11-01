//@ts-check
import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ImageEditor} from '../../components/ImageEditor/ImageEditor';
import {BottomRightButton} from '../BottomRightButton';
import ImageZoom from 'react-native-image-pan-zoom';
import Popover from 'react-native-popover-view';
import {Button, Icon} from 'native-base';

export class ImageWithAdjustment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditor: false,
      showZoom: false,
    };
  }

  toggleZoom = () => {
    this.setState(prevState => ({showZoom: !prevState.showZoom}));
  };

  render() {
    return (
      <View style={styles.imageContainer}>
        <Image
          style={this.shouldRotate()}
          source={{uri: this.props.imageToShow.getSource()}}
        />
        <BottomRightButton
          buttons={[
            {
              name: 'zoom-in',
              type: 'MaterialIcons',
              onPress: this.toggleZoom,
            },
            {
              name: 'edit',
              type: 'Entypo',
              onPress: this.showEditor(true),
            },
          ]}
        />
        <ImageEditor
          image={this.props.imageToEdit}
          showOver={this.state.showEditor}
          updateImage={this.props.onImageAdjusted}
          onClose={this.showEditor(false)}
        />
        <Popover isVisible={this.state.showZoom}>
          <View
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height,
            }}>
            <ImageZoom
              //style={this.shouldRotate()}
              cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              maxOverflow={0}
              //style={this.shouldRotate()}
              imageWidth={Dimensions.get('window').width}
              imageHeight={Dimensions.get('window').height * 0.85}>
              <Image
                style={{resizeMode: 'contain', width: '100%', height: '100%'}}
                source={{uri: this.props.nonProcessedImage.getSource()}}
              />
            </ImageZoom>
            <TouchableOpacity
              onPress={this.toggleZoom}
              style={{position: 'absolute', right: 24}}>
              <Icon
                type="Entypo"
                name="circle-with-cross"
                style={{color: 'gray', fontSize: 38}}
              />
            </TouchableOpacity>
          </View>
        </Popover>
      </View>
    );
  }

  showEditor = show => () => {
    this.setState({
      showEditor: show,
    });
  };

  shouldRotate() {
    let imageStyles = styles.image;
    if (this.props.shouldRotate) {
      imageStyles = {
        ...imageStyles,
        transform: [{rotate: '90deg'}],
      };
    }
    return imageStyles;
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 6,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '95%',
    height: '95%',
    resizeMode: 'contain',
  },
});
