import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase';

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: '', title: '', done: false }]);
  useEffect(() => {
    const unSubscribe = db.collection('tasks').onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          done: doc.data().done,
        }))
      );
    });
    return () => unSubscribe();
  }, []);
  return (
    <div className='App'>
      {tasks.map((task) => (
        <h3 key={task.id}>{task.title}</h3>
      ))}
    </div>
  );
};

export default App;
