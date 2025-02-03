import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/Home"; // Updated import path
import Home1 from "./components/Home1";

function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home1" element={<Home1 />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
            </Routes>
    );
}

export default App;