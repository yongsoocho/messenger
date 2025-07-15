import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { io } from "socket.io-client";
const socket = io("http://localhost:8080", { withCredentials: true });

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
	const [rooms, setRoom] = useState(null);
	const [selectedRoom, setSelectedRoom] = useState({});
	const [messages, setMessages] = useState({});

	// 방 가져오기
	useEffect(() => {
		fetchRooms();
	}, []);

	// room 리스트 가져오고 socket join
	useEffect(() => {
		if (rooms && rooms.length > 0) {
			rooms.forEach((room) => {
				socket.emit("join", room.id);
			});
		}
	}, [rooms]);

	// 채팅방 메세지 가져오기
	useEffect(() => {
		if (!selectedRoom || !Object.keys(selectedRoom).length) return;

		axios
			.get(`http://localhost:8080/chat`, {
				withCredentials: true,
				params: {
					roomId: selectedRoom.id,
				},
			})
			.then((res) => {
				setMessages((prev) => ({
					...prev,
					[selectedRoom.id]: res.data,
				}));
			});
	}, [selectedRoom]);

	useEffect(() => {
		socket.on("message", (data) => {
			setMessages((prev) => {
				return {
					...prev,
					[data.roomId]: [...(prev[data.roomId] || []), data],
				};
			});
		});
		return () => socket.off("message");
	}, []);

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
				selectedRoom,
				setSelectedRoom,
			}}
		>
			{children}
		</RoomContext.Provider>
	);
};
