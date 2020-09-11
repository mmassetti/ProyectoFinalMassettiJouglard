/**
 * @format
 */
import 'react-native';
import React from 'react';
import SessionDetails from '../SessionDetails.js';

import renderer from 'react-test-renderer';

describe('SessionDetail component', () => {
  test.skip('Renders correctly', () => {
    const component = renderer.create(<SessionDetails />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
