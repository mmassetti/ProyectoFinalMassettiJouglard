import {store} from '../../store/';
import {showSpinner, hideSpinner} from '../../store/actions';
import {Singleton} from './singletonService';

class InnerSpinnerService {
  callAsyncFunctionWithSpinner(fn) {
    store.dispatch(showSpinner());
    console.log('Open', fn);
    return fn().finally(() => {
      console.log('Close', fn);
      store.dispatch(hideSpinner());
    });
  }
}
export const SpinnerService = new Singleton(InnerSpinnerService);
