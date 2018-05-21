import React, { Component } from 'react';
import SwitchC from './containers/switchContainer';
import { Provider } from 'react-redux';
import store from './store/configStore'

 

const styles={
  fontFamily: 'sans-serif',
  textAlign: 'center',
  background:'#fafafa'
}
class App extends Component {
  
  render() {
    return (
      <div style={styles}>
       <Provider store={store}>
       <SwitchC />
       </Provider>
      </div>
    );
  }
}

export default App;
