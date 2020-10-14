import React from 'react';
import './App.scss';
import BookMark from './components/docs/BookMark';
import DocsList from './components/docs/DocsList';
import NavBar from './components/common/NavBar';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <main className="orbis-docs__main">
        <BrowserRouter>
            <NavBar />
            <Route exact path="/" component={DocsList} />
            <Route exact path="/bookmark" component={BookMark} />
        </BrowserRouter>
    </main>
  )
}

export default App;
