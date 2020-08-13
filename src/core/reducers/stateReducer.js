import combineReducers from 'react-combine-reducers';

function spinner(state, action) {
  switch (action.type) {
    case 'SHOW_SPINNER':
      return true;
    case 'HIDE_SPINNER':
      return false;
    default:
      return state;
  }
}

function showApp(state, action) {
  switch (action.type) {
    case 'SHOW_APP':
      return true;
    case 'HIDE_APP':
      return false;
    default:
      return state;
  }
}
export default combineReducers({
  spinner: [spinner, false],
  showApp: [showApp, false],
});
