import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import NoteApp from './features/notesApp';

const App = () => (
  <Provider store={store}>
    <NoteApp />
  </Provider>
);

export default App;