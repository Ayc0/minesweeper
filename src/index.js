import React from 'react';
import ReactDOM from 'react-dom';

import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

import App from './components/app';

const styletron = new Styletron();

ReactDOM.render(
  <StyletronProvider styletron={styletron}>
    <div>
      <App />
    </div>
  </StyletronProvider>,
  document.getElementById('root')
);
