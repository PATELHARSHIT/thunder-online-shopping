import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Title from "../components/Title";

function SignInScreen(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const redirect = props.location.search
		? props.location.search.split("?")[1]
		: "/";

	const userSignIn = useSelector(state => state.userSignIn);
	const { userInfo, loading, error } = userSignIn;

	const dispatch = useDispatch();
	const submitHandler = e => {
		e.preventDefault();
		dispatch(signIn(email, password));
	};

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [props.history, redirect, userInfo]);

	return (
		<div className="form-container">
			<form className="form" onSubmit={submitHandler}>
				<Title title="signin"></Title>
				{loading && <LoadingBox />}
				{error && <MessageBox variant="danger">{error}</MessageBox>}
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
						<b>SIGN IN</b>
					</button>
				</div>
				<div>
					<label />
					<div>
						New customer?{" "}
						<Link to={`/register?redirect=${redirect}`}>
							Create your account
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
}

export default SignInScreen;
