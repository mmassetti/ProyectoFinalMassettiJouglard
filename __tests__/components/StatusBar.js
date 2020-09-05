/**
 * @format
 */
import 'react-native';
import React from 'react';
import {NetStatusBar} from '../../src/shared/components/NetStatusBar';

import renderer from 'react-test-renderer';

describe('NetStatus component', () => {
  test('Renders correctly', () => {
    const component = renderer.create(<NetStatusBar />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
