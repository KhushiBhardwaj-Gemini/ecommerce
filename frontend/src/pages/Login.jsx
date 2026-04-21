import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Input from "../components/Input";
import "../styles/auth.css";


function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: ""
    });



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token); //caall token
            const userRes = await API.get("/auth/me");  //call /me API
            localStorage.setItem("user", JSON.stringify(userRes.data)); //store user
            navigate("/"); // redirect home

        } catch (err) {
            setError(err.response?.data?.msg || "Something went wrong");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                {error && <p className="error-text">{error}</p>}
                <Input
                    placeholder="Email"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <Input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => {
                        setForm({ ...form, password: e.target.value });
                        setError("");
                    }}
                />

                <button>Login</button>
            </form>

            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
}

export default Login;