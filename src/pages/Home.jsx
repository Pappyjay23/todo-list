import React, { useContext, useEffect, useState } from "react";
import Form from "../components/Form";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
	const [input, setInput] = useState("");
	const [todos, setTodos] = useState([]);


	const navigate = useNavigate();

	const logOut = () => {
		navigate("/");
	};

	const { userId } = useContext(AuthContext);

	useEffect(() => {
		const storedTodos = JSON.parse(
			localStorage.getItem(`todos-${userId}`) || "[]"
		);
		setTodos(storedTodos);
	}, [userId]);

	return (
		<div className='todo-app'>
			<div className='todo-container'>
				<div className='home-top-desc'>
					<h1>What's the Plan Today</h1>
					<button onClick={logOut}>Log out</button>
				</div>
				<Form
					input={input}
					setInput={setInput}
					todos={todos}
					setTodos={setTodos}
				/>
				<TodoList todos={todos} setTodos={setTodos} />
			</div>
		</div>
	);
};

export default Home;
