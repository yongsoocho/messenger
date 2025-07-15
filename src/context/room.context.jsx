import { createContext, use, useEffect, useState } from "react";
import axios from "axios";

import { io } from "socket.io-client";
const Socket = io("http://localhost:8080", { withCredentials: true });

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
	const [rooms, setRoom] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [messages, setMessages] = useState({});

	// 방 가져오기
	useEffect(() => {
		fetchRooms();
	}, []);

	// room 리스트 가져오고 socket join
	useEffect(() => {
		if (rooms && rooms.length > 0) {
			rooms.forEach((room) => {
				Socket.emit("join", room.id);
			});
		}
	}, [rooms]);

	// 채팅방 메세지 가져오기
	useEffect(() => {
		if (!selectedUser || !Object.keys(selectedUser).length) return;

		axios
			.get(`http://localhost:8080/chat?roomId=${selectedUser?.id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setMessages((prev) => ({
					...prev,
					[selectedUser.id]: res.data,
				}));
			});
	}, [selectedUser]);
	//

	const fetchRooms = async () => {
		try {
			const res = await axios.get("http://localhost:8080/room", {
				withCredentials: true,
			});
			setRoom(res.data);
		} catch (error) {
			console.error("Failed to fetch rooms:", error);
		}
	};

	const addRoom = async (email) => {
		try {
			const res = await axios.post(
				"http://localhost:8080/room",
				{ email },
				{ withCredentials: true },
			);
			setRoom((prevRooms) => [res.data, ...prevRooms]);
		} catch (error) {
			console.error("Failed to add room:", error);
		}
	};

	return (
		<RoomContext.Provider
			value={{
				rooms,
				fetchRooms,
				addRoom,
				selectedUser,
				setSelectedUser,
			}}
		>
			{children}
		</RoomContext.Provider>
	);
};
