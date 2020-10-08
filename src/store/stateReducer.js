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

function userName(state = '', {type, name}) {
  switch (type) {
    case 'SET_USER':
      return name;
    default:
      return state;
  }
}

function session(state = {}, {type, session}) {
  switch (type) {
    case 'SET_SESSION':
      return session;
    default:
      return state;
  }
}
function lote(state = {}, {type, lote}) {
  switch (type) {
    case 'SET_LOTE':
      return lote;
    default:
      return state;
  }
}
function pastura(state = {}, {type, pastura}) {
  switch (type) {
    case 'SET_PASTURA':
      return pastura;
    default:
      return state;
  }
}

export default combineReducers({
  spinner,
  showApp,
  userName,
  session,
  lote,
  pastura,
});
