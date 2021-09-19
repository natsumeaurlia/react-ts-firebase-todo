import { Button, FormControl, List, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { makeStyles } from '@material-ui/core';
import TodoForm from './TodoForm';
import { useData } from '../hooks/useData';
import TodoItem from './TodoItem';

const useStyles = makeStyles({
  list: {
    maxWidth: '300px',
  },
});

const TodoBox: React.FC = () => {
  // const [todos, setTodos] = useData();
  const { todos, setTodos, toggleComplete, removeData } = useData();

  const classes = useStyles();
  useEffect(() => {
    const unSubscribe = db.collection('tasks').onSnapshot((snapshot) => {
      setTodos(
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
    <React.Fragment>
      <List className={classes.list}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            done={todo.done}
            toggleComplete={toggleComplete}
            onRemove={removeData}
          />
        ))}
      </List>
      <TodoForm />
    </React.Fragment>
  );
};

export default TodoBox;
