/**
 * @format
 */
import 'react-native';
import React from 'react';
import {SessionHeader} from '../SessionHeader.js';

import renderer from 'react-test-renderer';

describe('SessionDetail component', () => {
  test('Renders correctly', () => {
    const component = renderer.create(
      <SessionHeader
        item={{date: {toDate: () => new Date()}, user: 'Juan', description: ''}}
      />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
