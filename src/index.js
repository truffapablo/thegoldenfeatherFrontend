import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ProyectoFinalApp } from './ProyectoFinalApp';
import 'animate.css';
import './styles/styles.scss';
import './styles/stylesReservations.scss';

console.log(process.env);

ReactDOM.render(
    <Provider store={store}>
      <ProyectoFinalApp/>
    </Provider>,
  document.getElementById('root')
);


