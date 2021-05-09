import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register, signIn } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Title from "../components/Title";

function RegisterScreen(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const redirect = props.location.search
		? props.location.search.split("?")[1]
		: "/";

	const userRegister = useSelector(state => state.userRegister);
	const { userInfo, loading, error } = userRegister;

	const dispatch = useDispatch();
	const submitHandler = e => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Password and Confirm Password does not match.");
		} else {
			dispatch(register(name, email, password));
		}
	};

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [props.history, redirect, userInfo]);

	return (
		<div className="form-container">
			<form className="form" onSubmit={submitHandler}>
				<Title title="create account"></Title>
				{loading && <LoadingBox />}
				{error && <MessageBox variant="danger">{error}</MessageBox>}
				<div>
					<label htmlFor="name">Username</label>
					<input
						type="text"
						id="name"
						placeholder="John Doe"
						required
						onChange={e => setName(e.target.value)}
					></input>
				</div>
				<div>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						placeholder="user@thunder.com"
						required
						onChange={e => setEmail(e.target.value)}
					></input>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						placeholder="user@thunder"
						required
						onChange={e => setPassword(e.target.value)}
					></input>
				</div>
				<div>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						id="confirmPassword"
						placeholder="user@thunder"
						required
						onChange={e => setConfirmPassword(e.target.value)}
					></input>
				</div>
				<div>
					<small>
						By continuing, I agree to the <b className="primary">Term of Use</b>{" "}
						& <b className="primary">Privacy Policy</b>
					</small>
				</div>
				<div>
					<label />
					<button
						onClick={e => submitHandler(e)}
						className="primary"
						type="submit"
					>
						<b>REGISTER</b>
					</button>
				</div>
				<div>
					<label />
					<div>
						Already have an account?{" "}
						<Link to={`/signin?redirect=${redirect}`}>Login Instead</Link>
					</div>
				</div>
			</form>
		</div>
	);
}

export default RegisterScreen;
