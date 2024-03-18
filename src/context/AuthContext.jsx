// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const storedUserId = localStorage.getItem("userId");
		if (storedUserId) {
			setUserId(storedUserId);
		}
	}, []);

	const signUp = (email, password) => {
		const newUserId = uuidv4();
		const user = { email, password, userId: newUserId };
		localStorage.setItem(`user-${newUserId}`, JSON.stringify(user));
		setUserId(newUserId);
	};

	const login = (email, password) => {
		const users = Object.values(localStorage).map(JSON.parse);
		const user = users.find(
			(user) => user.email === email && user.password === password
		);
		user && setUserId(user.userId);
	};

	const logout = () => {
		localStorage.removeItem(`user-${userId}`);
		localStorage.removeItem(`todos-${userId}`);
		setUserId(null);
	};

	return (
		<AuthContext.Provider value={{ userId, signUp, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
