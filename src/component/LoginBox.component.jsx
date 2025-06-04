const LoginBox = ({ children }) => {
	return (
		<div className="w-96 rounded-4xl box-border px-8 py-12 shadow-xl">
			<div className="flex flex-col items-center mb-8">
				<img src="/messenger.png" className="w-28" />
				<p className=" text-4xl font-semibold">Messenger</p>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default LoginBox;
