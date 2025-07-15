import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export const RoomContext = createContext();

const socket = io("http://localhost:8080", {
	withCredentials: true,
});

export const RoomProvider = ({ children }) => {
	const [rooms, setRoom] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState({});
	const [messages, setMessages] = useState({});

	// 방 가져오기
	useEffect(() => {
		fetchRooms();
	}, []);

	// room 가져와서 socket join
	useEffect(() => {
		if (rooms && rooms.length > 0) {
			rooms.forEach((room) => {
				socket.emit("join", room.id);
			});
		}

		return () => socket.off("join");
	}, [rooms]);

	// 채팅방 메세지 가져오기
	useEffect(() => {
		if (!selectedRoom || !Object.keys(selectedRoom).length) return;

		axios
			.get(`http://localhost:8080/chat`, {
				withCredentials: true,
				params: { roomId: selectedRoom.id },
			})
			.then((res) => {
				setMessages((prevMessages) => ({
					...prevMessages,
					[selectedRoom.id]: res.data,
				}));
			});
	}, [selectedRoom]);

	// 소켓 listen
	useEffect(() => {
		socket.on("message", (data) => {
			console.log(data);
			setMessages((prevMessages) => ({
				...prevMessages,
				[data.roomId]: [...(prevMessages[data.roomId] || []), data],
			}));
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
				messages,
			}}
		>
			{children}
		</RoomContext.Provider>
	);
};
