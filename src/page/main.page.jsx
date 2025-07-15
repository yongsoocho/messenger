import { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { RoomContext } from "../context/room.context";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function MainPage() {
	const [input, setInput] = useState("");
	const fileInputRef = useRef(null);
	const { logout, user } = useContext(AuthContext);
	const { rooms, fetchRooms, addRoom, selectedRoom, setSelectedRoom } =
		useContext(RoomContext);
	const [email, setEmail] = useState("");

	// const handleSend = () => {
	// 	if (!input.trim()) return;
	// 	const updated = [
	// 		...(messages[selectedUser.id] || []),
	// 		{ from: "me", text: input },
	// 	];
	// 	setMessages({ ...messages, [selectedUser.id]: updated });
	// 	setInput("");
	// };

	useEffect(() => {
		if (!rooms) {
			fetchRooms();
		}
	});

	return (
		<div className="flex h-screen font-sans">
			{/* Sidebar */}
			<div className="w-72 bg-white p-4 pt-2 border-r border-gray-300">
				<div className="flex items-center h-6 mb-4">
					<img src="/messenger.png" className="h-6 mr-1" />
					<p className="text-xl font-bold text-center">Messenger</p>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						addRoom(email);
					}}
				>
					<input
						className="input input-bordered w-full mb-2"
						placeholder="Search for people and groups"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</form>
				{rooms !== null ? (
					rooms.map((room) => (
						<div
							key={room.id}
							onClick={() =>
								user.email === room.fromUser
									? setSelectedRoom({ id: room.id, email: room.toUser.email })
									: setSelectedRoom({ id: room.id, email: room.fromUser.email })
							}
							className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 transition ${
								selectedRoom === user.email ? "bg-gray-100" : ""
							}`}
						>
							<div className="avatar mr-3">
								<div className="w-10 rounded-full">
									<img
										src={"https://i.pravatar.cc/150?u=lisa"}
										alt={
											user.email === room.fromUser.email
												? room.toUser.email
												: room.fromUser.email
										}
									/>
								</div>
							</div>
							<div className="flex-1">
								<div className="font-semibold text-sm">
									{user.email === room.fromUser.email
										? room.toUser.email
										: room.fromUser.email}
								</div>
								<div className="text-xs text-gray-500 truncate">
									{room.lastMessage}
								</div>
							</div>
							<div className="text-xs text-gray-400 ml-2">
								{dayjs(room.updatedAt).fromNow()}
							</div>
						</div>
					))
				) : (
					<></>
				)}
			</div>

			{/* Chat Area */}
			<div className="flex-1 flex flex-col bg-gray-50">
				{/* ─── 여기를 수정 ─── */}
				<div className="bg-white shadow-sm p-2 flex items-center border-b border-gray-200">
					{Object.keys(selectedRoom).length !== 0 ? (
						<>
							<div className="avatar mr-1">
								<div className="w-6 h-6 rounded-full overflow-hidden">
									<img
										src={"https://i.pravatar.cc/150?u=lisa"}
										alt={selectedRoom.id}
									/>
								</div>
							</div>
							<div className="flex-1">
								<p className="text-xs font-semibold">{selectedRoom.email}</p>
							</div>
						</>
					) : null}

					<div className="ml-auto">
						<button
							className="btn  bg-blue-500 text-white rounded-xl"
							onClick={logout}
						>
							logout
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
								/>
							</svg>
						</button>
					</div>
				</div>
				{/* ────────────────── */}

				<div className="flex-1 overflow-y-auto p-4 space-y-2 overflow-y-auto h-50">
					{/* {messages[selectedUser.id]?.map((msg, idx) => (
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
					))} */}
				</div>
				<div className="bg-white p-3 flex items-center gap-2">
					<input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						style={{ display: "none" }}
						onChange={(e) => console.log(e.target.files[0])}
					/>
					<button
						className="btn btn-sm"
						onClick={() => fileInputRef.current && fileInputRef.current.click()}
					>
						📷
					</button>
					<input
						className="input input-bordered w-full"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						// onKeyDown={(e) => e.key === "Enter" && handleSend()}
						placeholder="Type a message"
					/>
					<button
						className="btn btn-sm btn-circle bg-blue-500 text-white"
						// onClick={handleSend}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="size-5"
						>
							<path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
