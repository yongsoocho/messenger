import LoginBox from "../component/LoginBox.component";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
	const navi = useNavigate();

	const onClickSignUp = () => {
		navi("/signup");
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<LoginBox>
				<div className="mb-12">
					<input type="text" placeholder="email" className="input mb-4" />
					<input
						type="password"
						placeholder="password"
						className="input mb-2"
					/>
				</div>
				<div>
					<button className="w-full btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-blue-500 text-white mb-2">
						sign in
					</button>
				</div>
				<div className="flex justify-center">
					<button className="link text-blue-500" onClick={onClickSignUp}>
						sign up for facebook
					</button>
				</div>
			</LoginBox>
		</div>
	);
};

export default SigninPage;
