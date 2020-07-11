/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {configureFirebase} from './src/configuration/firebaseconfig';

AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = true;
configureFirebase();
