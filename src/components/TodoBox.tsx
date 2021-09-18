import { Button, FormControl, List, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { makeStyles } from '@material-ui/core';
import TaskItem from './TaskItem';
import TodoForm from './TodoForm';

const useStyles = makeStyles({
  list: {
    maxWidth: '300px',
  },
});

const TodoBox: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: '', title: '', done: false }]);

  const classes = useStyles();
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
    <React.Fragment>
      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} done={task.done} />
        ))}
      </List>
      <TodoForm />
    </React.Fragment>
  );
};

export default TodoBox;
