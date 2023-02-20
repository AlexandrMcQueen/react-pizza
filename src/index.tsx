import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";

const rootEl = document.getElementById('root');
if (rootEl) {
 const root = ReactDOM.createRoot(rootEl)
    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>

    );
}



