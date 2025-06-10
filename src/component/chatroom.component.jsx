const ChatRoom = (props) => {
	return (
		<div
			className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 transition `}
		>
			<div className="avatar mr-3">
				<div className="w-10 rounded-full overflow-hidden">
					<img src={props.avatar} alt={props.name} />
				</div>
			</div>
			<div className="flex-1">
				<div className="font-semibold text-sm">{props.name}</div>
				<div className="text-xs text-gray-500 truncate">
					{props.lastMessage}
				</div>
			</div>
			<div className="text-xs text-gray-400 ml-2">{props.time}</div>
		</div>
	);
};

export default ChatRoom;
