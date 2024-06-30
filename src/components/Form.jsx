import React, { useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { MdOutlinePostAdd } from "react-icons/md";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function Form({ input, setInput, todos, setTodos }) {
	const getInputData = (e) => {
		setInput(e.target.value);
	};
	const { user } = useContext(AuthContext);

	const addTodos = async (e) => {
		e.preventDefault();
		if (!input || !user) {
			return;
		}

		try {
			await addDoc(collection(db, `users/${user.email}/todoList`), {
				text: input,
				completed: false,
				createdAt: new Date(),
			});
			setInput("");
		} catch (error) {
			console.error("Error adding todo:", error);
		}
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
				<button onClick={addTodos} type='submit' className='add-todo-btn'>
					<MdOutlinePostAdd className='add-todo-btn-icon' />
				</button>
			</form>
		</div>
	);
}

export default Form;
