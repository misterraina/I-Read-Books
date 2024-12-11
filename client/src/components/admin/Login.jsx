import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { REACT_APP_API_BACKEND } from "../../const";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${REACT_APP_API_BACKEND}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include", // Include cookies in requests
            });

            if (response.ok) {
                login(); // Update global auth state
                navigate("/admin"); // Redirect to admin dashboard
            } else {
                const data = await response.json();
                setError(data.error || "Login failed");
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError("An error occurred. Please try again.");
        }
    };

    // Redirect to admin dashboard if already authenticated
    if (isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form
                className="p-6 bg-white shadow-md rounded"
                onSubmit={handleLogin}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
