import React from 'react';
import logo from './logo.svg';
import './styles/App.scss';
import Catalog from './Containers/Catalog';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Cars catalog
      </header>
      <main>
        <Catalog />
      </main>
    </div>
  );
}

export default App;
