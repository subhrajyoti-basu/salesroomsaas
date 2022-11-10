import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";


const Signup = () => {
	const [data, setData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:4000/register";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	if(localStorage.token){
		return <Navigate replace to='/' />;
	}else return (
		<div className="flex flex-col items-center h-screen justify-center">
			<div className="max-w-[300px] w-full">
				<div >
					<form className="flex flex-col text-center space-y-3" onSubmit={handleSubmit}>
						<h1 className="mb-5">Create Account</h1>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={handleChange}
							value={data.firstName}
							required
							className="border px-3 py-1 rounded-md"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="border px-3 py-1 rounded-md"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="border px-3 py-1 rounded-md"
						/>
						{error && <div >{error}</div>}
						<button type="submit" className="btn" >
							Sign Up
						</button>
					</form>
				</div>
                <div className="flex mt-2 justify-center">
					<p className="font-medium">Already have an Account?</p>
					<Link to="/login">
						<button type="button" className="ml-3" >
							Sign In
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signup;