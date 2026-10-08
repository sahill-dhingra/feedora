import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/review/:businessId" element={<ReviewPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;