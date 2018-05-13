import React, { Component } from 'react';
import LoginPage from './components/loginPage'
const styles={
  fontFamily: 'sans-serif',
  textAlign: 'center',
}
class App extends Component {
  render() {
    return (
      <div style={styles}>
       <LoginPage/>
      </div>
    );
  }
}

export default App;
