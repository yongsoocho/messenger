import React, { useRef } from "react";

const ChatArea = ({}) => {
	const fileInput = useRef(null);

	const selectedUser = {
		id: 2,
		name: "Andrea Mittelstaedt",
		lastMessage: "You: Be right there!",
		time: "12:04 pm",
		avatar: "https://i.pravatar.cc/150?u=andrea",
	};

	const messages = [
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
	];

	const handleSend = () => {
		console.log("Message sent");
	};

	return (
		<div className="flex-1 flex flex-col bg-gray-50">
			<div className="bg-white shadow-sm p-2 flex items-center border-b border-gray-200">
				<div className="avatar mr-1">
					<div className="w-6 h-6 rounded-full overflow-hidden">
						<img src={selectedUser.avatar} alt={selectedUser.name} />
					</div>
				</div>
				<div className="flex-1">
					<p className="text-xs font-semibold">{selectedUser.name}</p>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-4 space-y-2 h-50">
				{messages.map((message, idx) => (
					<div
						key={idx}
						className={`chat ${message.from == "me" ? "chat-end" : "chat-start"}`}
					>
						<div className="chat-header text-xs text-gray-500 mb-1">
							{message.from}
						</div>
						<div
							className={`chat-bubble chat-bubble-neutral max-w-sm rounded-xl ${message.from === "me" ? "bg-blue-500" : "bg-gray-200 text-black"}`}
						>
							{message.text}
						</div>
					</div>
				))}
			</div>

			<div className="bg-white p-3 flex items-center gap-2">
				<input
					type="file"
					className="hidden"
					ref={fileInput}
					style={{ display: "none" }}
					onChange={(e) => {
						const file = e.target.files[0];
						console.log(file);
					}}
				/>
				<button
					className="btn btn-sm text-xl"
					onClick={() => fileInput.current && fileInput.current.click()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-6"
					>
						<path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
						<path
							fill-rule="evenodd"
							d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
				<input
					className="input input-bordered w-full"
					value={() => {
						return 0;
					}}
					onChange={(e) => {}}
					placeholder="Type a message..."
				/>
				<button
					className="btn btn-sm btn-circle bg-blue-500 text-white"
					onClick={handleSend}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-6"
					>
						<path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
					</svg>
				</button>
			</div>
		</div>
	);
};

export default ChatArea;
