export const hideSpinner = () => ({type: 'HIDE_SPINNER'});
export const showSpinner = () => ({type: 'SHOW_SPINNER'});

export const appOffline = () => ({type: 'OFFLINE'});
export const appOnline = () => ({type: 'ONLINE'});

export const showBackground = callback => ({
  type: 'SHOW_BACK',
  onPress: callback,
});
export const hideBackground = callback => ({
  type: 'HIDE_BACK',
  onPress: callback,
});
