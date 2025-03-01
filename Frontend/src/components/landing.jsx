import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

export default function LandingPage() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        document.querySelector(".landing-container").classList.add("fade-out");
        setTimeout(() => {
            navigate("/home");
        }, 1000); // 1 second delay
    };

    return (
        <div className="landing-container">
            <motion.h1
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="landing-title neon-text"
            >
                Arcade Array 🎯
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="landing-subtitle"
            >
                Level up your gaming experience!
            </motion.p>

            <motion.button
                whileHover={{ scale: 1.1, textShadow: "0 0 15px #00ffff" }}
                whileTap={{ scale: 0.9 }}
                className="landing-button glitch"
                onClick={handleNavigate}
            >
                Enter Arcade
            </motion.button>
        </div>
    );
}
