const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "https://arcadearray.netlify.app", // ✅ Fix: Remove extra slash at the end
        "https://arcade-array.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));

// ✅ Preflight request handling
app.options("*", cors(corsOptions)); 

// ✅ Test Route (Check if API is working)
app.get("/test", (req, res) => {
    res.json({ message: "API is working correctly!" });
});
