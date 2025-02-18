import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/Home"; // Updated import path
import Home1 from "./components/Home1";
import Friends from "./components/Friends";
import Notifications from "./components/Notification";
import Catagory from "./components/Catagory"


function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/home1" element={<Home1 />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/catagory" element={<Catagory />} />
            </Routes>
    );
}

export default App;