import { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth.context";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Protected = ({ children }) => {
	const { isLoggedIn, setLoading, setUser, setIsLoggedIn, loading } =
		useContext(AuthContext);

	useEffect(() => {
		if (isLoggedIn !== null) return;

		setLoading(true);
		const controller = new AbortController();

		const checkAuth = async () => {
			try {
				const { data } = await axios("http://localhost:8080/user/profile", {
					withCredentials: true,
					signal: controller.signal,
				});
				setUser(data);
				setIsLoggedIn(true);
			} catch (error) {
				if (axios.isCancel(error)) {
					console.log("Request cancelled:", error.message);
					return;
				}

				console.error("Authentication check failed:", error);
				setUser(null);
				setIsLoggedIn(false);
			} finally {
				setLoading(false);
			}
		};

		checkAuth();

		return () => {
			controller.abort();
		};
	}, []);

	if (loading || isLoggedIn === null) {
		return <div>Loading...</div>;
	}

	if (!isLoggedIn) {
		return <Navigate to="/signin" replace />;
	}

	return children;
};

export default Protected;
