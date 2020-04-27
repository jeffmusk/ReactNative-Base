// In App.js in a new project

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from './configureStore.js'
import MainScreen from './mainScreen';



const store = configureStore();


const App = () => (
  <Provider store={store}>
      <MainScreen />
  </Provider>
)

export default App;

