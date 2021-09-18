import React, { useState } from 'react';
import { Button, FormControl, makeStyles, TextField } from '@material-ui/core';
import { db } from '../firebase';

const useStyles = makeStyles({
  root: {
    minWidth: '200px',
  },
  formWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
});

const TodoForm: React.FC<{}> = () => {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const saveTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection('tasks').add({ title: input, done: false });
    setInput('');
  };
  return (
    <div className={classes.formWrapper}>
      <FormControl className={classes.root}>
        <TextField
          size='medium'
          variant='standard'
          label='what do you need to do?'
          value={input}
          onChange={handleInput}
        />
      </FormControl>
      <Button variant='outlined' disabled={!input} onClick={saveTask}>
        Save Item
      </Button>
    </div>
  );
};

export default TodoForm;
