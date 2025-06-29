import LoginBox from "../component/LoginBox.component";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";

const SignupPage = () => {
	const { signup } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<LoginBox>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						signup({ email, password: confirmPassword });
					}}
				>
					<div className="mb-12">
						<input
							type="text"
							placeholder="email"
							className="input mb-4"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							placeholder="password"
							className="input mb-2"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<input
							type="password"
							placeholder="confirm password"
							className="input"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<div>
						<button
							className="w-full btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-blue-500 text-white"
							type="submit"
						>
							sign up
						</button>
					</div>
				</form>
			</LoginBox>
		</div>
	);
};

export default SignupPage;
