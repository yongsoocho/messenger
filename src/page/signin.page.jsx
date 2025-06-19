import { useContext, useState } from "react";
import LoginBox from "../component/LoginBox.component";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const SigninPage = () => {
	const navi = useNavigate();
	const { login } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onClickSignUp = () => {
		navi("/signup");
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<LoginBox>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						login({ email, password });
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
					</div>
					<div>
						<button className="w-full btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-blue-500 text-white mb-2">
							sign in
						</button>
					</div>
					<div className="flex justify-center">
						<button
							className="link text-blue-500"
							onClick={onClickSignUp}
							type="submit"
						>
							sign up for facebook
						</button>
					</div>
				</form>
			</LoginBox>
		</div>
	);
};

export default SigninPage;
