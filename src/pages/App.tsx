import React, { useEffect, useState } from 'react';
import './App.css';
import TodoBox from '../components/TodoBox';

const App: React.FC = () => {
  return (
    <div className='App'>
      <TodoBox />
    </div>
  );
};

export default App;
