import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ProyectoFinalApp } from './ProyectoFinalApp';

import 'animate.css';

import './styles/fonts.scss';
import './styles/styles.scss';
import './styles/stylesReservations.scss';
import './styles/stylesSearch.scss';
import './styles/stylesPanel.scss';


ReactDOM.render(
    <Provider store={store}>
      <ProyectoFinalApp/>
    </Provider>,
  document.getElementById('root')
);


