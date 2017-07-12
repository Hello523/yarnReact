import React from 'react';
import ReactDOM from 'react-dom';
// import {Provider} from 'react-redux';

// import store from './Redux/Store';
import { Provider } from 'mobx-react';
import store from './Mobx'


import App from './App';

// import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Provider {...store}>
         <App/>
     </Provider>
, document.getElementById('root'));
// registerServiceWorker();
