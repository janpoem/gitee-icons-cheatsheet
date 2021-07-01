import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const appMount = () => {
  let container = document.getElementById('app_container');
  if (container == null) {
    container = document.createElement('div');
    container.setAttribute('id', 'app_container');
    container.className = 'app-container';
    ReactDOM.render(<App/>, container);
    document.body.appendChild(container);
  }
};

window.onload = appMount;
