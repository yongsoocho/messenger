const LoginBox = ({ children }) => {
	return (
		<div className="w-120 shadow-xl rounded-xl p-1 flex flex-col items-center">
			<div className="flex flex-col items-center">
				<img src="/messenger.png" className="w-28" />
				<p className=" text-4xl font-semibold">Messenger</p>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default LoginBox;
