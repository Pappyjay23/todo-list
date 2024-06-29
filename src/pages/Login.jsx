import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { IoEyeOff, IoEye } from "react-icons/io5";

const Login = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const [formError, setFormError] = useState("");

	const { login } = useContext(AuthContext);

	const [errors, setErrors] = useState({});

	const validateForm = (formData) => {
		const errors = {};
		if (!formData.email) {
			errors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = "Please enter a valid email address";
		}
		if (!formData.password) {
			errors.password = "Password is required";
		}
		return errors;
	};

	const { email, password } = formData;
	const handleLogin = (e) => {
		e.preventDefault();

		const validationErrors = validateForm(formData);
		setErrors(validationErrors);

		const users = Object.values(localStorage).map(JSON.parse);
		const user = users.find(
			(user) => user.email === email && user.password === password
		);

		if (Object.keys(validationErrors).length === 0) {
			login(email, password);

			if (user) {
				navigate("/home");
				setFormData({ ...formData, email: "", password: "" });
			} else {
				setFormError(
					"We couldn't find an account matching that email and password. No worries, try again!"
				);

				setTimeout(() => {
					setFormData({ ...formData, email: "", password: "" });
					setFormError("");
				}, 2500);
			}
		}
	};

	return (
		<>
			<div className='blur-overlay'></div>
			<div className='todo-app'>
				<div className='todo-container'>
					<h1 className='title'>Login</h1>
					<p className='title-error-message'>{formError}</p>
					<form onSubmit={handleLogin} className='login-form'>
						<input
							type='email'
							value={email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							placeholder='Email'
						/>
						{errors.email && <p className='error-message'>{errors.email}</p>}
						<div className='password-group'>
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
								placeholder='Password'
							/>
							<span
								className='toggle-password-icon'
								onClick={() => setShowPassword((prev) => !prev)}>
								{showPassword ? <IoEyeOff /> : <IoEye />}
							</span>
						</div>
						{errors.password && (
							<p className='error-message'>{errors.password}</p>
						)}
						<button type='submit'>Login</button>
						<p>
							Already have an account?{" "}
							<Link to='/sign-up'>
								<span>Sign up</span>
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
