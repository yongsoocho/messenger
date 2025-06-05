import { useState } from "react";

const users = [
	{
		id: 1,
		name: "Lisa Benet",
		lastMessage: "You sent a sticker.",
		time: "12:35 pm",
		avatar: "https://i.pravatar.cc/150?u=lisa",
	},
	{
		id: 2,
		name: "Andrea Mittelstaedt",
		lastMessage: "You: Be right there!",
		time: "12:04 pm",
		avatar: "https://i.pravatar.cc/150?u=andrea",
	},
	{
		id: 3,
		name: "Weekend Trip",
		lastMessage: "Peter: Of course!",
		time: "11:24 am",
		avatar: "https://i.pravatar.cc/150?u=weekend",
	},
];

const dummyMessages = {
	3: [
		{ from: "me", text: "Ok everyone, I made the reservation!" },
		{ from: "Lisa", text: "Yes! Thanks for doing that." },
		{
			from: "Peter",
			text: "Let's meet at my house Saturday morning. How’s 9?",
		},
		{ from: "Sasha", text: "Works for me!" },
		{ from: "Peter", text: "Does anyone need a sleeping bag?" },
		{ from: "Sasha", text: "Yes, can I borrow one?" },
		{ from: "Peter", text: "Of course!" },
	],
};

export default function MainPage() {
	const [selectedUser, setSelectedUser] = useState(users[2]);
	const [messages, setMessages] = useState(dummyMessages);
	const [input, setInput] = useState("");

	const handleSend = () => {
		if (!input.trim()) return;
		const updated = [
			...(messages[selectedUser.id] || []),
			{ from: "me", text: input },
		];
		setMessages({ ...messages, [selectedUser.id]: updated });
		setInput("");
	};

	return (
		<div className="flex h-screen font-sans">
			{/* Sidebar */}
			<div className="w-72 bg-white p-4 pt-2 border-r border-gray-300">
				<div className="flex items-center h-6 mb-4">
					<img src="/messenger.png" className="h-6 mr-1" />
					<p className="text-xl font-bold text-center">Messenger</p>
				</div>
				<input
					className="input input-bordered w-full mb-2"
					placeholder="Search for people and groups"
				/>
				{users.map((user) => (
					<div
						key={user.id}
						onClick={() => setSelectedUser(user)}
						className={`w-full flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 transition ${
							selectedUser.id === user.id ? "bg-gray-100" : ""
						}`}
					>
						<div className="avatar mr-3">
							<div className="w-10 rounded-full">
								<img src={user.avatar} alt={user.name} />
							</div>
						</div>
						<div className="flex-1">
							<div className="font-semibold text-sm">{user.name}</div>
							<div className="text-xs text-gray-500 truncate">
								{user.lastMessage}
							</div>
						</div>
						<div className="text-xs text-gray-400 ml-2">{user.time}</div>
					</div>
				))}
			</div>

			{/* Chat Area */}
			<div className="flex-1 flex flex-col bg-gray-50">
				<div className="bg-[radial-gradient(circle,_#00b2ff_0%,_#5f52ff_35%,_#c840f6_65%,_#ff2a8a_100%)] p-2 box-border font-semibold text-md text-white text-center">
					{selectedUser.name}
				</div>
				<div className="flex-1 overflow-y-auto p-4 space-y-2 overflow-y-auto h-50">
					{messages[selectedUser.id]?.map((msg, idx) => (
						<div
							key={idx}
							className={`chat ${msg.from === "me" ? "chat-end" : "chat-start"}`}
						>
							<div className="chat-header text-xs text-gray-500 mb-1">
								{msg.from}
							</div>
							<div
								className={`chat-bubble chat-bubble-neutral max-w-sm rounded-xl ${msg.from === "me" ? "bg-blue-500" : "bg-gray-200 text-black"}`}
							>
								{msg.text}
							</div>
						</div>
					))}
				</div>
				<div className="bg-white p-3 flex items-center gap-2">
					<button className="btn btn-sm">Aa</button>
					<button className="btn btn-sm">📷</button>
					<button className="btn btn-sm">GIF</button>
					<input
						className="input input-bordered w-full"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSend()}
						placeholder="Type a message"
					/>
					<button className="btn btn-sm btn-circle" onClick={handleSend}>
						👍
					</button>
				</div>
			</div>
		</div>
	);
}
