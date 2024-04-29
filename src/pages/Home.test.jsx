import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

describe("Home", () => {
	it("should contain a heading", () => {
		render(
			<AuthProvider>
				<BrowserRouter>
					<Home />
				</BrowserRouter>
			</AuthProvider>
		);
		const headerElement = screen.getByRole("heading", {
			name: "What's the Plan Today",
		});

		expect(headerElement).toBeInTheDocument();
	});
});
