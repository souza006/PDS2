import '../../components/style/main.css';
import React, { Component } from 'react';
import Header from '../../components/NavBar';
import FormArtigo from '../../components/FormArtigo';

class App extends Component {


  render() {
    return (
      <div className="App">
        <Header />
        <FormArtigo />
      </div>
    );
  }

}

export default App;




