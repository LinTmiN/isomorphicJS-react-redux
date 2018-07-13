import React, { Component } from 'react';
import SwitchC from './containers/switchContainer';
import { Provider } from 'react-redux';
import store from './store/configStore'


class App extends Component {
  
  render() {
    return (
      <React.Fragment >
       <Provider store={store}>
       <SwitchC />
       </Provider>
      </React.Fragment>
    );
  }
}

export default App;
