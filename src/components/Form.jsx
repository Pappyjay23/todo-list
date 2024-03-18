import React, { useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Form({ input, setInput, todos, setTodos }) {
	const getInputData = (e) => {
		setInput(e.target.value);
	};
	const { userId } = useContext(AuthContext);

	const addTodos = (e) => {
		e.preventDefault();
		if (!input) {
			return;
		}

		const newTodos = [
			...todos,
			{ text: input, completed: false, id: Math.random() * 1000 },
		];

		setTodos(newTodos);

		localStorage.setItem(`todos-${userId}`, JSON.stringify(newTodos));

		setInput("");
	};

	const inputRef = useRef(null);
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<div className='todo-form-container'>
			<form className='todo-form'>
				<input
					onChange={getInputData}
					ref={inputRef}
					type='text'
					placeholder='Add a todo'
					value={input}
				/>
				<button onClick={addTodos} type='submit'>
					Add todo
				</button>
			</form>
		</div>
	);
}

export default Form;
