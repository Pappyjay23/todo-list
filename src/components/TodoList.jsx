import React from 'react'
import Todo from './Todo'

function TodoList ({ todos }) {
  return (
        <div className='todo-cover'>
            <ul className='todo-items'>
                {todos.map(e => (
                    <Todo key={e.id} todo={e} />
                ))}
            </ul>
        </div>
  )
}

export default TodoList
