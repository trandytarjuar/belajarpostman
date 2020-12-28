/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import mahasiswa from './src/mahasiswa'

AppRegistry.registerComponent(appName, () => mahasiswa);
