import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth.context.jsx";
import { BrowserRouter } from "react-router-dom";
import { RoomProvider } from "./context/room.context.jsx";

createRoot(document.getElementById("root")).render(
	// <StrictMode>
	<BrowserRouter>
		<AuthProvider>
			<App />
		</AuthProvider>
	</BrowserRouter>,
	// </StrictMode>,
);
