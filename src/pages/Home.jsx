import React, { useContext, useEffect, useState } from "react";
import Form from "../components/Form";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
	const [input, setInput] = useState("");
	const [todos, setTodos] = useState([]);

	const navigate = useNavigate();

	const { user, logout } = useContext(AuthContext);

	useEffect(() => {
		if (user) {
			const q = query(
				collection(db, `users/${user.email}/todoList`),
				orderBy("createdAt", "desc")
			);

			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const todosArray = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setTodos(todosArray);
			});

			return () => unsubscribe();
		}
	}, [user]);

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<>
			<div className='blur-overlay'></div>
			<div className='todo-app'>
				<div className='todo-container'>
					<div className='log-out-container'>
						<button onClick={handleLogout} className='logOutBtn'>
							Log out
						</button>
					</div>
					<div className='home-top-desc'>
						<h1>What's the Plan Today</h1>
						<button onClick={handleLogout}>Log out</button>
					</div>
					<Form
						input={input}
						setInput={setInput}
						todos={todos}
						setTodos={setTodos}
					/>
					<TodoList todos={todos} />
				</div>
			</div>
		</>
	);
};

export default Home;
