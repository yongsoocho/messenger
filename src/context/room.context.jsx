import { createContext, useState } from "react";
import axios from "axios";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
	const [rooms, setRoom] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);

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
