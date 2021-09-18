import React, { useState } from 'react';
import { ListItem, TextField, Grid } from '@material-ui/core';
import { EditOutlined, DeleteOutline, Check } from '@material-ui/icons';
import { db } from '../firebase';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  deleteButton: { border: '1px solid #d43f3a', backgroundColor: '#d9534f' },
  doneButton: { border: '1px solid #4cae4c', backgroundColor: '#5cb85c' },
});

interface Props {
  id: string;
  title: string;
  done: boolean;
}

const TaskItem: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState(props.title);
  const classes = useStyles();

  const editTask = () => {
    db.collection('tasks').doc(props.id).set({ title: title }, { merge: true });
  };

  const deleteTask = () => {
    db.collection('tasks').doc(props.id).delete();
  };

  const toggleDoneTask = () => {
    db.collection('tasks').doc(props.id).set({ done: !props.done }, { merge: true });
  };

  return (
    <React.Fragment>
      <ListItem style={{ backgroundColor: props.done ? '#dff0d8' : 'transparent' }}>
        <span style={{ width: '200px' }}>{props.title}</span>
        {/* <span onClick={editTask} style={{ cursor: 'pointer' }}>
          <EditOutlined />
        </span> */}
        <button onClick={toggleDoneTask} className={classes.doneButton}>
          <Check />
        </button>
        <button onClick={deleteTask} className={classes.deleteButton}>
          <DeleteOutline />
        </button>
      </ListItem>
    </React.Fragment>
  );
};

export default TaskItem;
