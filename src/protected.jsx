import { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth.context";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Protected = ({ children }) => {
	const { setUser, isLoggedIn, setIsLoggedIn, setLoading, loading } =
		useContext(AuthContext);

	useEffect(() => {
		setLoading(true);
		const controller = new AbortController();

		const checkAuth = async () => {
			try {
				const { data } = await axios.get("http://localhost:8080/user/profile", {
					withCredentials: true,
					signal: controller.signal,
				});

				setUser(data);
				setIsLoggedIn(true);
			} catch (error) {
				console.error("Authentication check failed:", error);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		checkAuth();

		return () => {
			controller.abort();
		};
	}, [setIsLoggedIn, setLoading, setUser]);

	if (loading || isLoggedIn === null) {
		return <div>Loading...</div>;
	}

	if (!isLoggedIn) {
		return <Navigate to="/signin" replace />;
	}

	return children;
};

export default Protected;
