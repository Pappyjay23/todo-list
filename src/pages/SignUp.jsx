import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { IoEye, IoEyeOff } from "react-icons/io5";

const SignUp = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const { signUp } = useContext(AuthContext);

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
	const handleSignUp = (e) => {
		e.preventDefault();

		const validationErrors = validateForm(formData);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			signUp(email, password);

			navigate("/home");

			setFormData({ ...formData, email: "", password: "" });
		}
	};

	return (
		<div className='todo-app'>
			<div className='todo-container'>
				<h1 className='title'>Sign Up</h1>
				<form onSubmit={handleSignUp} className='sign-up-form'>
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
							placeholder='Create Password'
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
					<button type='submit'>Sign up</button>
					<p>
						Already have an account?{" "}
						<Link to='/'>
							<span>Login</span>
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
