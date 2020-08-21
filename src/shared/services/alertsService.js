import {Alert} from 'react-native';
import prompt from 'react-native-prompt-android';

export class AlertService {
  _instance;

  static getInstance() {
    if (!this._instance) this._instance = new AlertService();

    return this._instance;
  }

  showConfirmDialog(message) {
    return Alert.alert('Confirmar', message);
  }

  showPromptDialog(defaultValue, message) {
    return new Promise(resolve => {
      prompt(
        message,
        '',
        [{text: 'Cancel'}, {text: 'Confirmar', onPress: resolve}],
        {
          defaultValue: defaultValue,
        },
      );
    });
  }
}
