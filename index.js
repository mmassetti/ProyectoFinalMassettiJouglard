/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {configureFirebase} from './src/configuration/firebaseconfig';
import {syncPhotosWithCloudinary} from './src/shared/services/cloudinarySyncService';
import 'react-native-get-random-values';
import BackgroundTimer from 'react-native-background-timer';

AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreAllLogs(true);
configureFirebase();

BackgroundTimer.setInterval(() => {
  syncPhotosWithCloudinary();
}, 10000);
