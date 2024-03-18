import React, { useState } from 'react'
import Form from '../components/Form'
import TodoList from '../components/TodoList'

const Home = () => {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])
  return (
    <div className="todo-app">
        <div className="todo-container">
            <h1>What's the Plan Today</h1>
            <Form input={input} setInput={setInput} todos={todos} setTodos={setTodos} />
            <TodoList todos={todos} setTodos ={setTodos}/>
        </div>
    </div>
  )
}

export default Home
