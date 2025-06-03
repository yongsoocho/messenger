const LoginBox = ({ children }) => {
	return (
		<div className="w-screen h-screen justify-center items-center">
			<div className="w-72 shadow-sm">
				<image src="/messenger.png" />
				{children}
			</div>
		</div>
	);
};

export default LoginBox;
