/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import LoginScreen from './src/LoginScreen'
import RegisterScreen from './src/RegisterScreen'
import ForgotPassword from './src/ForgotPassword'
import MainNavigation from './src/Navigation/MainNavigation'

AppRegistry.registerComponent(appName, () => MainNavigation);

