import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProvider from './context/auth-context'
import ProductContextProvider from './context/cart-context';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AuthContextProvider>
            <ProductContextProvider>
                <App />
            </ProductContextProvider>
        </AuthContextProvider>
    </Provider>
);