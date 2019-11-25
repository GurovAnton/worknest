//Core
import React from 'react';
import { Provider } from 'mobx-react';

//Components
import { Main } from './Main';
import stores from './store/stores';

function App() {
  return (
    <Provider {...stores}>
      <Main />
    </Provider>
  );
}

export default App;
