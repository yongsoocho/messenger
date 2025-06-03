import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
	const { isLoggedIn } = useContext(AuthContext);

	if (!isLoggedIn) {
		return <Navigate to="/signin" replace />;
	}

	return children;
};

export default Protected;
