import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);

	const navi = useNavigate();

	const login = async ({ email, password }) => {
		setLoading(true);
		try {
			const { data } = await axios.post(
				"http://localhost:8080/user/signin",
				{
					email,
					password,
				},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			setIsLoggedIn(true);
			setUser(data);
			navi("/");
		} catch (error) {
			console.error("Login failed:", error);
			setIsLoggedIn(false);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};
	const logout = async () => {
		setLoading(true);
		try {
			await axios.post(
				"http://localhost:8080/user/logout",
				{},
				{
					withCredentials: true,
				},
			);
		} catch (error) {
			console.error("Logout failed:", error);
		} finally {
			setIsLoggedIn(null);
			setUser(null);
			setLoading(false);
		}
	};
	const signup = async ({ email, password }) => {
		setLoading(true);
		try {
			const { data } = await axios.post(
				"http://localhost:8080/user/signup",
				{
					email,
					password,
				},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			setIsLoggedIn(true);
			setUser(data);
			navi("/");
		} catch (error) {
			console.error("Login failed:", error);
			setIsLoggedIn(false);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				loading,
				user,
				setIsLoggedIn,
				setLoading,
				setUser,
				login,
				logout,
				signup,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
