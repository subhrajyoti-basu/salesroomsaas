import { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setData({ ...data, [e.target.name] : e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${import.meta.env.VITE_API_ADDRESS}/login`;
			const { data: res } = await axios.post(url, data);
			console.log(res)
			localStorage.setItem("token", `JWT ${res.token}`);
			window.location = "/";
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
				<div>
					<form className="flex flex-col text-center space-y-3" onSubmit={handleSubmit}>
						<h1 className="mb-5">Login</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}					
							required
                            className="border px-3 py-1 rounded-md"
							
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							required
                            className="border px-3 py-1 rounded-md"
							
						/>
						{error && <div>{error}</div>}
						<button type="submit" className="btn">
							Sign In
						</button>
					</form>
				</div>
				<div className="flex mt-2 justify-center">
					<p className="font-medium">Create an Account?</p>
					<Link to="/signup">
						<button type="button" className="ml-3" >
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;