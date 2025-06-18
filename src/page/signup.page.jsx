import LoginBox from "../component/LoginBox.component";

const SignupPage = () => {
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
					<input
						type="password"
						placeholder="confirm password"
						className="input"
					/>
				</div>
				<div>
					<button className="w-full btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-blue-500 text-white">
						sign up
					</button>
				</div>
			</LoginBox>
		</div>
	);
};

export default SignupPage;
