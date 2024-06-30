import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function Todo({ todo }) {
	const [edit, setEdit] = useState(false);
	const [editValue, setEditValue] = useState(todo.text);
	const editRef = useRef(null);

	const { user } = useContext(AuthContext);

	useEffect(() => {
		edit && editRef.current.focus();
	}, [edit]);

	const deleteTodo = async () => {
		if (!user) return;
		try {
			await deleteDoc(doc(db, `users/${user.email}/todoList`, todo.id));
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	};

	const completeTodo = async () => {
		if (!user) return;
		try {
			await updateDoc(doc(db, `users/${user.email}/todoList`, todo.id), {
				completed: !todo.completed,
			});
		} catch (error) {
			console.error("Error updating todo:", error);
		}
	};

	const editTodo = () => {
		setEdit(!edit);
	};

	const handleEdit = (e) => {
		setEditValue(e.target.value);
	};

	const handleSubmit = async (id) => {
		if (!user) return;
		try {
			await updateDoc(doc(db, `users/${user.email}/todoList`, id), {
				text: editValue,
			});
			setEdit(false);
		} catch (error) {
			console.error("Error updating todo:", error);
		}
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
