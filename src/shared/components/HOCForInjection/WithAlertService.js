import React from 'react';
import {AlertService} from '../../services/alertsService';

export function withAlertService(WrappedComponent) {
  return function ComponentWithSessionsService(props) {
    return (
      <WrappedComponent {...props} alertService={AlertService.getInstance()} />
    );
  };
}
