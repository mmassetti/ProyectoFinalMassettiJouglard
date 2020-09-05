/**
 * @format
 */
import 'react-native';
import React from 'react';
import {ImageEditor} from '../../src/shared/components/ImageEditor';
import renderer from 'react-test-renderer';

describe('ImageEditor component', () => {
  test('renders correctly', () => {
    const component = renderer.create(<ImageEditor />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
