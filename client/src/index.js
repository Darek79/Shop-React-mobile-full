import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/rootReducer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import { App } from './app';
import Test from './Test/Clicker';
import { CategoryPage } from './Test/CategoryPage';
import { CheckoutMain } from './Test/LogMeIn';
import Checkout from './Test/Checkout';
import { CheckoutLoginMain } from './Test/CheckoutLoginMain';
import PayPal from './Test/paypalMain';
import Stripe from './Test/Stripe';
import PayPalBtn from './Test/PayPalBtn';
console.log(store, 'STORE');

const { registerObserver } = require('react-perf-devtool');
registerObserver();

import './main.scss';

const root = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  root
);
