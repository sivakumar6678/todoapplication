import { Fragment } from "react";
import './addtodo.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddTodo({ addTodo }) {
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  }

  return (
    <Fragment>
      <div className="addblock">
        <TextField
          fullWidth
          label="Add Todo"
          id="fullWidth"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          requiredField
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          Add
        </Button>
      </div>
    </Fragment>
  );
}

export default AddTodo;