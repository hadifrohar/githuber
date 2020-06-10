import React from 'react';
import Main from './components/MainComponent';
import {Provider} from 'react-redux';
import {initStore} from './redux/initStore';
import {PersistGate} from 'redux-persist/integration/react';

const App: () => React$Node = () => {

  const {persistor, store} = initStore();

    return (
      <Provider store={store}>
          <PersistGate persistor={persistor}>
              <Main/>
          </PersistGate>
      </Provider>
  );
};
export default App;
