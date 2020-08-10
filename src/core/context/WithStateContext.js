import React, {useContext} from 'react';
import StateContext from './StateContext';

export default function withStateContext(WrappedComponent) {
  return function WithStateContext(props) {
    const value = useContext(StateContext);
    return (
      <WrappedComponent
        {...props}
        state={value.state}
        dispatcher={value.dispatcher}
      />
    );
  };
}
