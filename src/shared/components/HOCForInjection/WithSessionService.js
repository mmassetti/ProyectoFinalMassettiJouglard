import React from 'react';
import {SessionsService} from '../../services/sessions';

export function withSessionsService(WrappedComponent) {
  return function ComponentWithSessionsService(props) {
    return (
      <WrappedComponent
        {...props}
        sessionsService={SessionsService.getInstance()}
      />
    );
  };
}
