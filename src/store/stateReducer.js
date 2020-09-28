import {combineReducers} from 'redux';

function spinner(state = false, action) {
  switch (action.type) {
    case 'SHOW_SPINNER':
      return true;
    case 'HIDE_SPINNER':
      return false;
    default:
      return state;
  }
}

function showApp(state = true, action) {
  switch (action.type) {
    case 'SHOW_APP':
      return true;
    case 'HIDE_APP':
      return false;
    default:
      return state;
  }
}
function background(state = true, {type, onPress}) {
  switch (type) {
    case 'SHOW_BACK':
      return {show: true, onPress: onPress};
    case 'HIDE_BACK':
      return {show: false, onPress: onPress};
    default:
      return state;
  }
}

export default combineReducers({
  spinner,
  showApp,
  background,
});
