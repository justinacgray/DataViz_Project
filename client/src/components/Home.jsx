import React, { useEffect, useState } from "react";

const Home = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/api/home")
            .then((response) => response.json())
            .then((data) => setMessage(data.message))
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default Home;
