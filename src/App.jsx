import { useEffect } from "react";
import { useState } from "react";
import './App.css';
import classes from './styles.module.css';
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";
import { Fragment } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AddTodo from "./components/add_todo";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
// import DeleteIcon from '@mui/icons-material/Delete';


function App() {
  const [checked, setChecked] = React.useState([0]);
  const[loading,setLoading] = useState(false);
  const[todolist,setTodolist] = useState([]);
  const[errormsg,setErrormsg] = useState(null);
  const[showdetails,setShowdetails] = useState(false);
  const[tododetails,setTododetails] = useState(null);

  const[addtodo,setAddtodo] = useState('');
  const[addtodolist,setAddtodolist] = useState([]);
  const[loadingmsg,setLoadingmsg] = useState(null);

  // const addTodo = (e) => {
  //   // e.preventDefault();
  //   setAddtodolist([...addtodolist,{id:Math.random(),todo:addtodo}]);
  //   setAddtodo('');
  // }

  const addTodo = (newTodo) => {
    setAddtodolist([...addtodolist, { id: Math.random(), todo: newTodo }]);
    setAddtodo('');
    setLoading(true);
    setLoadingmsg("Adding Todo...");
  }

  useEffect(() => {
    setTimeout(() => {
    setLoading(false);
    }, 2000);
    console.log("Add todo list",addtodolist);
  }
  ,[addtodolist])

  const deleteTodo = (id) => {
    const newTodoList = addtodolist.filter((todo) => todo.id !== id);
    setAddtodolist(newTodoList);
    // setTimeout(() => {
    setLoading(true);
    setLoadingmsg("Deleting Todo...");
    // }, 2000);
  }
  const completeTodo = (id) => {
    const newTodoList = addtodolist.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setAddtodolist(newTodoList);
  }
  const editTodo = (id, newTodo) => {
    const newTodoList = addtodolist.map((todo) => { 
      if (todo.id === id) {
        console.log("Edit todo",todo);
        newTodo = prompt("Edit Todo", todo.todo);
        setLoading(true);
        setTimeout(() => {
        setLoadingmsg("Editing Todo...");
        },2000);
        return { ...todo, todo: newTodo };
      }
      return todo;
    });
    setAddtodolist(newTodoList);

  }
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    completeTodo(value);
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };


  // async function fetchalltodo(){
  //   try{
  //     const apiResponse = await fetch('https://dummyjson.com/todos');
  //     const result = await apiResponse.json();
  //     // .then(res => res.json())
  //     // .then(console.log);
  //     console.log("TO-Do api",result);
  //     if (result?.todos && result?.todos.length > 0){
  //       setTodolist(result?.todos);
  //       setErrormsg('');
  //       setLoading(true);
  //     }else{
  //       setLoading(false);
  //       setErrormsg("No data found");
  //     }
  //   }catch(e){
  //     console.log("Error",e);
  //   }
  // }
  // async function fetchsingletodo(id){
  //   // alert("Single TO-Do api ",id);
  //   console.log("Single TO-Do api",id);
  //   try{
  //     const apiResponse = await fetch(`https://dummyjson.com/todos/${id}`);
  //     // .then(res => res.json())
  //     // .then(console.log);
  //     const result = await apiResponse.json();
  //     console.log("Single TO-Do api", result);
  //     if (result) {
  //       console.log("The single to do item" , result);
  //       setTododetails(result);
  //       setShowdetails(true);
  //     } else {
  //       setTododetails(null);
  //       setShowdetails(false);
  //       setErrormsg("No data found");
  //     }
  //   }catch(e){
  //     console.log("Error",e);
  //   }
  // }
  // useEffect(() => {
  //   fetchalltodo()
  // },[])
  // useEffect(() => {
  //   fetchsingletodo()
  // },[showdetails])
  // if (!loading) {
  //   return <Skeleton variant="rectangular" width={650} height={650} />;
  // }  
  return (
    <div className={classes.mainwrapperclass} >
      <h1 className="headertitle" >TO DO Application </h1>
      <div >

        <AddTodo 
          addTodo={addTodo}
          />
          {
            loading ? (
              <h1 className={classes.headertitle} >{ loadingmsg }</h1>):
              <div className="tododata">

            <List sx={{  margin: 5 , textAlign:'center', width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            
              {addtodolist.map((todo, index) => (
                <ListItem
                  key={todo.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                    </IconButton>
                  }
                  disablePadding>
                  <ListItemButton key={index} role={undefined} onClick={handleToggle(todo.id)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.includes(todo.id)}
                        // onClick={() => completeTodo(todo.id)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': `checkbox-list-label-${todo.id}` }}
                      />
                    </ListItemIcon>
                    <ListItemText 
                      id={`checkbox-list-label-${todo.id}`}
                      primary={todo.isCompleted ? <strike>{todo.todo}</strike> : todo.todo}
                      />
                  </ListItemButton>
                  <Button color="secondary" onClick={() => editTodo(todo.id)} >Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => deleteTodo(todo.id)} >Delete</Button>
                </ListItem>
              ))}
            </List>
              </div>
          }
</div>
      {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start">
        {addtodolist.map((todo, index) => (
          <ListItemText key={index}
            primary={todo.isCompleted ? <strike>{todo.todo}</strike> : todo.todo}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'inline' }}
                >
                  <Button color="secondary" onClick={() => editTodo(todo.id)} >Edit</Button>
                  <Button variant="contained" color="success" onClick={() => completeTodo(todo.id)} >Complete</Button>
                </Typography>
                <Button variant="outlined" color="error" onClick={() => deleteTodo(todo.id)} >Delete</Button>
              
              </React.Fragment>
            }
          />
        ))}
        </ListItem>
      </List> */}

      {/* <ul> */}
          {/* {addtodolist.map((todo, index) => ( */}
            {/* <li key={index}> {todo.isCompleted ? <strike>{todo.todo}</strike> : todo.todo} */}
                            {/* {todo.todo}  */}
                            {/* <Button color="secondary" onClick={() => editTodo(todo.id)} >Edit</Button>
                            <Button variant="contained" color="success" onClick={() => completeTodo(todo.id)} >Complete</Button>
                            <Button variant="outlined" color="error" onClick={() => deleteTodo(todo.id)} >Delete</Button> */}

            {/* </li>
          ))}
      </ul> */}
      {/* <div className="tododetails">

          {
            loading ? (
              " "
            ) : (
              <h1 className={classes.headertitle} >Loading...</h1>
            )
          }
          {
            todolist && todolist.length > 0 ?   
            todolist.map((todoitem)  =>  <TodoItem 
            fetchsingletodo={fetchsingletodo}  
                                          todo={todoitem} />) : null
                                          
          }
          <TodoDetails 
            setShowdetails = {setShowdetails}
            setTododetails = {setTododetails}
            showdetails={showdetails} 
            tododetails={tododetails}
          ></TodoDetails>

      </div> */}
     {/* {
        loading ? (
          <div>
            <h1 className={classes.mainwrapper } > TO-Do List</h1>
            <ul>
              {
                todolist.map((todo,index) => {
                  return(
                    <li key={index}>{todo.todo}</li>
                  )
                })
              }
            </ul>
          </div>
        ) : (
          <h1>{errormsg}</h1>
        )
     } */}
    </div>
  )

  
}

export default App;
