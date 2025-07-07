import { Route, Routes } from "react-router-dom";
import MainPage from "./page/main.page";
import SigninPage from "./page/signin.page";
import SignupPage from "./page/signup.page";
import Protected from "./protected";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";

function App() {
	const { loading } = useContext(AuthContext);
	let test;

	if (loading) {
		return (
			<div className="text-5xl w-screen h-screen flex justify-center items-center">
				<span className="loading loading-bars loading-xl"></span>
			</div>
		);
	}

	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<Protected>
							<MainPage />
						</Protected>
					}
				/>
				<Route path="/signin" element={<SigninPage />} />
				<Route path="/signup" element={<SignupPage />} />
			</Routes>
		</>
	);
}

export default App;
