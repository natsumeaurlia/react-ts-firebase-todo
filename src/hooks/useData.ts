import { title } from 'process';
import { useState } from 'react';
import { Todo } from '../components/TodoItem';
import { db } from '../firebase';

export const useData = (initialTodos?: Todo[]) => {
  const [todos, setTodos] = useState(initialTodos || []);
  const addData = (data: { title: string }) => {
    if (!data.title || /^\s*$/.test(data.title)) {
      return;
    }
    db.collection('tasks').add({ title: title, done: false });

    // const todo = Object.assign({ id: Math.random() * 12345 }, data);
    // const newTodo = [todo, ...tasks];
    // setTodos(newTodo);
  };

  const toggleComplete = (id: string, done: boolean) => {
    db.collection('tasks').doc(id).set({ done: done }, { merge: true });

    //
  };

  const removeData = (id: string) => {
    db.collection('tasks').doc(id).delete();

    // const removeArr = [...todos].filter((todo) => todo.id !== id);
    // setTodos(removeArr);
  };

  return { todos, setTodos, addData, toggleComplete, removeData };
};
