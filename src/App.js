import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { Home, Upload, Dashboard, TableCategory, AddNewCategory } from "./components";

function App() {
	return (
		<AnimatePresence exitBeforeEnter>
			<div className="w-screen h-screen bg-[url('./assets/images/bg-images/zma.svg')] overflow-x-hidden">
				<Routes>
					<Route path="/*" element={<Home />} />
					<Route path="/upload" element={<Upload />} />
					<Route path="/dashboard/*" element={<Dashboard />} />
					<Route path="/dashboard/category" element={<TableCategory />} />
					<Route path="/dashboard/category/addnew" element={<AddNewCategory />} />
				</Routes>
			</div>
		</AnimatePresence>
	);
}

export default App;
