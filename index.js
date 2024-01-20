/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// import {Provider} from 'react-redux';
// import configureStore from './app/redux/store';

// const store = configureStore();

// const FundApp = () =>
// <Provider store={store}>
//     <App />
// </Provider>

// AppRegistry.registerComponent(appName, () => FundApp );

AppRegistry.registerComponent(appName, () => App);
