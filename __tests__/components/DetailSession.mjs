/**
 * @format
 */
import 'react-native';
import React from 'react';
import SessionDetails from '../../src/core/components/sessions/SessionDetails.js';

import renderer from 'react-test-renderer';

describe('SessionDetail component', () => {
  test('Adding a new Lote', () => {
    const component = renderer.create(<SessionDetails />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
