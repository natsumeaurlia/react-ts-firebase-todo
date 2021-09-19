import React, { useEffect, useState } from 'react';
import './App.css';
import TodoBox from '../components/TodoBox';
import { auth } from '../firebase';
import { RouteComponentProps } from 'react-router';

const App: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push('login');
    });
    return () => unSub();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      props.history.push('login');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className='App'>
      <TodoBox />
      <div
        onClick={() => {
          logout();
        }}
      >
        ログアウト
      </div>
    </div>
  );
};

export default App;
