import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider, } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension"
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { createStore } from 'redux';
import reducer from './redux/reducer';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();


const store = createStore(reducer, persistedState, (process.env.NODE_ENV !== "production") ?
  composeWithDevTools() : undefined);

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

store.subscribe(() => {
  saveState({
    ...store.getState()
  });
});


const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
