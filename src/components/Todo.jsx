import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function Todo({ todos, todo, setTodos }) {
	const [edit, setEdit] = useState(false);
	const [editValue, setEditValue] = useState(todo.text);
	const editRef = useRef(null);

	const { userId } = useContext(AuthContext);

	useEffect(() => {
		edit && editRef.current.focus();
	}, [edit]);

	const deleteTodo = () => {
		const updatedTodos = todos.filter((el) => el.id !== todo.id);
		setTodos(updatedTodos);
		localStorage.setItem(`todos-${userId}`, JSON.stringify(updatedTodos));
	};

	const completeTodo = () => {
		const updatedTodos = todos.map((el) => {
			if (el.id === todo.id) {
				return {
					...el,
					completed: !todo.completed,
				};
			}
			return el;
		});
		setTodos(updatedTodos);
		localStorage.setItem(`todos-${userId}`, JSON.stringify(updatedTodos));
	};

	const editTodo = () => {
		setEdit(!edit);
	};

	const handleEdit = (e) => {
		setEditValue(e.target.value);
	};

	const handleSubmit = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, text: editValue } : todo
		);
		setTodos(updatedTodos);
		localStorage.setItem(`todos-${userId}`, JSON.stringify(updatedTodos));
		setEdit(false);
	};

	const handleKeyPress = (e, id) => {
		if (e.keyCode === 13) {
			handleSubmit(id);
		}
	};

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className={todo.completed ? "todo-item completed" : "todo-item"}>
			{edit && !todo.completed ? (
				<div className='edit-todo-group'>
					<input
						type='text'
						onChange={handleEdit}
						value={editValue}
						ref={editRef}
						className='edit-input'
						onKeyDown={(e) => handleKeyPress(e, todo.id)}
					/>
					<button onClick={() => handleSubmit(todo.id)} type='submit'>
						<span className='icon'>
							<FaCheckCircle />
						</span>
					</button>
				</div>
			) : (
				<>
					<p>{todo.text}</p>
					<div className='icon-group'>
						<button onClick={completeTodo} type='submit'>
							<span className='icon'>
								<FaCheckCircle />
							</span>
						</button>
						<button onClick={deleteTodo} type='submit'>
							<span className='icon'>
								<FaTimesCircle />
							</span>
						</button>
						<button type='submit' onClick={editTodo}>
							<span className='icon'>
								<FaEdit />
							</span>
						</button>
					</div>
				</>
			)}
		</form>
	);
}

export default Todo;
