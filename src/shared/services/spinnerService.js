import {store} from '../../store/';
import {showSpinner, hideSpinner} from '../../store/actions';

export class SpinnerService {
  static _instance;

  static getInstance() {
    if (!this._instance) this._instance = new SpinnerService();
    return this._instance;
  }

  callAsyncFunctionWithSpinner(fn) {
    store.dispatch(showSpinner());
    return fn().then(response => {
      store.dispatch(hideSpinner());
      return response;
    });
  }
}
