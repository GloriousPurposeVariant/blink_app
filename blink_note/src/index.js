// import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import NoteApp from './features/notesApp';
const root = ReactDOM.createRoot(document.getElementById('root'));


const App = () => (
  <Provider store={store}>
    <NoteApp />
  </Provider>
);

root.render(<App />);
