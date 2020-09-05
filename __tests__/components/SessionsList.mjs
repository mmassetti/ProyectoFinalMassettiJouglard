/**
 * @format
 */
import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import {SessionList} from '../../src/core/components/sessions/SessionsList';

describe('SessionList component', () => {
  test('Renders correctly', () => {
    const component = renderer.create(<SessionList />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
