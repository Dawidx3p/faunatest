import React, { useEffect, useState } from 'react'
import analytics from './utils/analytics'
import api from './utils/api'
import isLocalHost from './utils/isLocalHost'
import './App.css'
import AddTodo from './components/AddTodo'


export default function App(){
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    analytics.page()

    // Fetch all todos
    api.readAll().then((todos) => {
      if (todos.message === 'unauthorized') {
        if (isLocalHost()) {
          alert('FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info')
        } else {
          alert('FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct')
        }
        return false
      }

      console.log('all todos', todos)
      setTodos(todos)
    },[])
  })
  return(
    <>
    <AddTodo todos={todos} updateTodos={(newState) => setTodos(newState)}/>
    <ul>{todos.map((todo,key) => <li key={key}>{todo.data.title}</li>)}</ul>
    </>
    
  )
}