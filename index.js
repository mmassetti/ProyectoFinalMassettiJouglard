/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {configureFirebase} from './src/configuration/firebaseconfig';
import 'react-native-get-random-values';

AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreAllLogs(true);
configureFirebase();
