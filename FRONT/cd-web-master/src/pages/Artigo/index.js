import React, {Component} from 'react';
import '../../components/style/Artigo.css';

import Header from '../../components/NavBar.js';
import DadosArtigo from '../../components/DadosArtigo.js';

class App extends Component {

  render(){
    return(
      <div className="App">
        <Header/>
        <DadosArtigo/>
      </div>
    );
  }
}

export default App;
