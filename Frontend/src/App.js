import React from 'react';
import './App.css';
import MessageComponent from './components/MessageComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Smart Recipes</h1>
        <MessageComponent />
      </header>
    </div>
  );
}

export default App;
