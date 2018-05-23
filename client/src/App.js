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
      <section style={styles}>
       <Provider store={store}>
       <SwitchC />
       </Provider>
      </section>
    );
  }
}

export default App;
