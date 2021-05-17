import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import Title from "../components/Title";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function ProfileScreen() {
	const userSignIn = useSelector(state => state.userSignIn);
	const { userInfo } = userSignIn;
	const userDetails = useSelector(state => state.userDetails);
	const { loading, error, user } = userDetails;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(detailsUser(userInfo._id));
	}, [dispatch, userInfo._id]);

	const submitHandler = e => {
		e.preventHandler();
	};

	return (
		<div>
			<form className="form" onSubmit={submitHandler}>
				<Title title="Profile"></Title>
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<>
						<div>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								id="name"
								placeholder="Enter Name"
								value={user.name}
							/>
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								placeholder="Enter Email"
								value={user.email}
							/>
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								placeholder="Enter Password"
							/>
						</div>
						<div>
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input
								type="password"
								id="confirmPassword"
								placeholder="Enter Password Again"
							/>
						</div>
						<div>
							<label></label>
							<button className="primary" type="submit">
								Update
							</button>
						</div>
					</>
				)}
			</form>
		</div>
	);
}

export default ProfileScreen;
