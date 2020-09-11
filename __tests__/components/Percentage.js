/**
 * @format
 */
import 'react-native';
import React from 'react';
import {Percentage} from '../../src/shared/components/PercentageCircle';

import renderer from 'react-test-renderer';
import {ProgressCircle} from 'react-native-progress/Circle';

describe('Percentage component', () => {
  test('Renders correctly', () => {
    const component = renderer.create(<Percentage />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Renders with props', () => {
    const component = renderer.create(
      <Percentage color="green" percentage={66} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Has correct color', () => {
    const component = renderer.create(
      <Percentage color="green" percentage={66} />,
    );
    let root = component.root;
    const percentageCircle = root.findByType(ProgressCircle);
    expect(percentageCircle.props.color).toEqual('green');
  });
  test('Has correct value', () => {
    const component = renderer.create(
      <Percentage color="green" percentage={66} />,
    );
    let root = component.root;
    const percentageCircle = root.findByType(ProgressCircle);
    expect(percentageCircle.props.progress._value).toBeCloseTo(0.66, 5);
  });
});
