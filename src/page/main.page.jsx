import ChatArea from "../component/chatarea.component";
import ChatRoom from "./../component/chatroom.component";

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

const selectedUser = users[2];

const MainPage = () => {
	return (
		<div className="flex h-screen">
			{/* chat room  */}
			<div className="w-80 bg-white p-4 pt-2 border-r border-gray-300">
				<div className="flex items-center h-6 mb-4">
					<img src="/messenger.png" className="h-6 mr-1" />
					<p className="text-xl font-bold text-center">Messenger</p>
				</div>
				<input
					className="input input-bordered w-full mb-2"
					placeholder="Search for people and groups"
				/>
				{users.map((user) => (
					<ChatRoom
						key={user.id}
						name={user.name}
						lastMessage={user.lastMessage}
						time={user.time}
						avatar={user.avatar}
					/>
				))}
			</div>

			{/* chat area */}
			<ChatArea />
		</div>
	);
};

export default MainPage;
