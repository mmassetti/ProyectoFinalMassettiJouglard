import {createStore} from 'redux';

import reducers from './stateReducer';

export const store = createStore(reducers);
