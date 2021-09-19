import React, { useState } from 'react';
import { ListItem, TextField, Grid } from '@material-ui/core';
import { EditOutlined, DeleteOutline, Check } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { useData } from '../hooks/useData';

const useStyles = makeStyles({
  deleteButton: { border: '1px solid #d43f3a', backgroundColor: '#d9534f' },
  doneButton: { border: '1px solid #4cae4c', backgroundColor: '#5cb85c' },
});

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

type Props = Todo & { toggleComplete: (id: string, done: boolean) => void; onRemove: (id: string) => void };

const TodoItem: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState(props.title);
  const classes = useStyles();

  return (
    <React.Fragment>
      <ListItem style={{ backgroundColor: props.done ? '#dff0d8' : 'transparent' }}>
        <span style={{ width: '200px' }}>{props.title}</span>
        {/* <span onClick={editTask} style={{ cursor: 'pointer' }}>
          <EditOutlined />
        </span> */}
        <button onClick={() => props.toggleComplete(props.id, !props.done)} className={classes.doneButton}>
          <Check />
        </button>
        <button onClick={() => props.onRemove(props.id)} className={classes.deleteButton}>
          <DeleteOutline />
        </button>
      </ListItem>
    </React.Fragment>
  );
};

export default TodoItem;
