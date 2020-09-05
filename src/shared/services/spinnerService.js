import {store} from '../../store/';
import {showSpinner, hideSpinner} from '../../store/actions';
import {Singleton} from './singletonService';

class InnerSpinnerService {
  callAsyncFunctionWithSpinner(fn) {
    store.dispatch(showSpinner());
    return fn().then(response => {
      store.dispatch(hideSpinner());
      return response;
    });
  }
}
export const SpinnerService = new Singleton(InnerSpinnerService);
