import {mainThemeColor} from '../../configuration';
import {Icon} from 'native-base';
import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ImageEditor} from '../../shared/components/ImageEditor';

export class ImageWithAdjustment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditor: false,
    };
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        <Image
          style={this.shouldRotate()}
          source={{uri: this.props.imageToShow.getSource()}}
        />
        <TouchableOpacity
          onPress={this.showEditor(true)}
          style={styles.adjustButton}>
          <Icon name="edit" type="Entypo" style={styles.icon} />
        </TouchableOpacity>
        <ImageEditor
          image={this.props.imageToEdit}
          showOver={this.state.showEditor}
          updateImage={this.props.onImageAdjusted}
          onClose={this.showEditor(false)}
        />
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
    if (this.props.imageToShow.shouldRotate) {
      imageStyles = {
        ...imageStyles,
        transform: [{rotate: '90deg'}],
      };
    }
    return imageStyles;
  }
}

const styles = StyleSheet.create({
  adjustButton: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    backgroundColor: mainThemeColor(1),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
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
