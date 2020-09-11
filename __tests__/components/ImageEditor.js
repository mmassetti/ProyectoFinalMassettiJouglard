/**
 * @format
 */
import 'react-native';
import React from 'react';
import {ImageEditor} from '../../src/shared/components/ImageEditor';
import renderer from 'react-test-renderer';

const mockImage = {
  getSource: () => {
    return '';
  },
  getWidth: () => {
    return 0;
  },
  getHeight: () => {
    return 0;
  },
};

describe('ImageEditor component', () => {
  test.skip('renders correctly', () => {
    const component = renderer.create(<ImageEditor image={mockImage} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
