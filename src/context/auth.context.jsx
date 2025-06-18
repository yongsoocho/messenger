import { createContext, useEffect, useState } from "react";
import { axios } from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const login = async ({ email, password }) => {
		setIsLoading(true);
		try {
			const { data } = await axios.post(
				`http://localhost:8080/user/login`,
				{
					email,
					password,
				},
				{
					withCredentials: true,
				},
			);
			setUser(data);
			setIsLoggedIn(true);
		} catch (error) {
			console.error("Login failed:", error);
			setUser(null);
			setIsLoggedIn(false);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		setIsLoading(true);
		try {
			await axios.post(
				`http://localhost:8080/user/logout`,
				{},
				{
					withCredentials: true,
				},
			);
		} catch (error) {
			console.error("Logout failed:", error);
		} finally {
			setUser(null);
			setIsLoggedIn(false);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const controller = new AbortController();

		const initAuth = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get(
					`http://localhost:8080/user/profile`,
					{
						withCredentials: true,
					},
					{
						signal: controller.signal,
					},
				);
				setUser(data);
				setIsLoggedIn(true);
			} catch (error) {
				console.error("Error during initial authentication check:", error);
				setUser(null);
				setIsLoggedIn(false);
			} finally {
				setIsLoading(false);
			}
		};
		initAuth();

		return () => {
			controller.abort();
		};
	});

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, login, logout, user, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
};
