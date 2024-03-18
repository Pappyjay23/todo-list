import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignUp />} />
				{/* <Route path='/' element={<Login />} /> */}
				{/* <Route path='/' element={<Home />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
