import {Alert} from 'react-native';
import prompt from 'react-native-prompt-android';
import {Singleton} from './singletonService';

class InnerAlertService {
  showConfirmDialog(message) {
    return new Promise(resolve => {
      Alert.alert('Confirmar', message, [
        {text: 'Cancelar'},
        {text: 'Confirmar', onPress: resolve},
      ]);
    });
  }

  showPromptDialog(defaultValue, message) {
    return new Promise((resolve, reject) => {
      prompt(
        message,
        '',
        [
          {text: 'Cancelar', onPress: reject},
          {text: 'Confirmar', onPress: resolve},
        ],
        {
          defaultValue: defaultValue,
        },
      );
    });
  }
}

export const AlertService = new Singleton(InnerAlertService);
