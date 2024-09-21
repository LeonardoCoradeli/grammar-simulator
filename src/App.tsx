import React, { useState, useEffect } from 'react';
// import GrammarDefinition from './components/GrammarDefinition';
// import DerivationTree from './components/DerivationTree';
import NaviBar from './components/navibar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grammar from './components/grammatic-simulator/Grammar';
import Regex from './components/regex/regex';
import Home from './components/Home/Home';
import './App.css'

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('0');

  const handlePageChange = (page: string) => {
      setCurrentPage(page);
  };
  
  return (
    <div className='App'>
        <NaviBar onPageChange={handlePageChange}/>
        <div className='App row'>
          <div className='col-3 App'> </div>
          <div>
            {currentPage === '0' && <Home />}
            {currentPage === '1' && <Regex />}
            {currentPage === '2' && <Grammar />}
            {currentPage === '3' && <h1>Automato Finito</h1>}
          </div>
          <div className='col-3 container'> </div>
        </div>
    </div>
  );
};

export default App;
