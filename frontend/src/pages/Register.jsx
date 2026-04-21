import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Input from "../components/Input";
import "../styles/auth.css";


function Register() {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/register", form);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.msg || "Something went wrong");
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                {error && <p className="error-text">{error}</p>}
                <Input
                    placeholder="Name"
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <Input
                    placeholder="Email"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button>Register</button>
            </form>
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
}

export default Register;