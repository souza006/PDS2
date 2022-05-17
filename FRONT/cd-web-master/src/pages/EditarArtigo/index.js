import '../../components/style/main.css';
import React, { Component } from 'react';
import Header from '../../components/NavBar';
import FormArtigoEditar from '../../components/FormEditarArtigo';

class App extends Component {


  render() {
    return (
      <div className="App">
        <Header />
        <FormArtigoEditar />
      </div>
    );
  }

}

export default App;




