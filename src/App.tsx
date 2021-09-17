import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { db } from './firebase';

const App: React.FC = () => {
  const [tasks, setTasks] = useState({ id: '', title: '', done: false });
  return <div className='App'></div>;
};

export default App;
