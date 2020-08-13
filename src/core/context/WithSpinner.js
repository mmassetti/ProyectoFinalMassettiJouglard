import React, {useContext} from 'react';
import StateContext from './StateContext';

export function withSpinner(WrappedComponent) {
  return function WithSpinner(props) {
    const {dispatch} = useContext(StateContext);
    const showSpinnerAction = {type: 'SHOW_SPINNER'};
    const hideSpinnerAction = {type: 'HIDE_SPINNER'};

    return (
      <WrappedComponent
        {...props}
        spinner={{
          showSpinner: () => dispatch(showSpinnerAction),
          hideSpinner: () => dispatch(hideSpinnerAction),
        }}
      />
    );
  };
}
