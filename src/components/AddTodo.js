import React from "react";
import analytics from '../utils/analytics'
import api from '../utils/api'
import { useState } from "react"

export default function AddTodo({todos, updateTodos}){
    const [title, setTitle] = useState('');
    return(
        <form onSubmit={(e) => {
            e.preventDefault();
            if(!title){
                alert('Please add Title');
                return false
            }
            const todoInfo = {
                title
            }
            const date = new Date().getTime()*1000;
            const newTodoArray = [...todos, {data: todoInfo, ts: date}];
            updateTodos(newTodoArray);
            api.create(todoInfo).then((response) => {
                console.log(response)
                if(!response.ok){
                    updateTodos(todos.filter(todo => todo.ts!==date));
                }
                /* Track a custom event */
                analytics.track('todoCreated', {
                  category: 'todos',
                  label: title,
                })
              }).catch((e) => {
                console.log('An API error occurred', e);

                updateTodos(todos.filter(todo => todo.ts!==date));
            })
        }}>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type='submit' />
        </form>
    )
}