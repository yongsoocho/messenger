import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./page/main.page";
import SigninPage from "./page/signin.page";
import SignupPage from "./page/signup.page";
import Protected from "./protected";

function App() {
	return (
		<>
			<Router>
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
			</Router>
		</>
	);
}

export default App;
