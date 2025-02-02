const Home = () => {
    return (
        <div>
            <h1>Welcome to the Dashboard!</h1>
            <button onClick={() => localStorage.removeItem("token")}>Logout</button>
        </div>
    );
};

export default Home;
