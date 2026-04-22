import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../utils/api";
// import Input from "../components/Input";
import Input from "../components/form/TextInput/index.jsx";
import "../styles/auth.css";


function Login() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),

            password: Yup.string()
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                    "Password must contain letters, numbers and at least one special character"
                )
                .required("Password is required")
        }),

        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const res = await API.post("/auth/login", values);

                localStorage.setItem("token", res.data.token);

                const userRes = await API.get("/auth/me");
                localStorage.setItem("user", JSON.stringify(userRes.data));

                navigate("/");
            } catch (err) {
                setErrors({
                    general: err.response?.data?.msg || "Login failed"
                });
            } finally {
                setSubmitting(false);
            }
        }
    })
    // const [error, setError] = useState("");
    // const [form, setForm] = useState({
    //     email: "",
    //     password: ""
    // });



    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const res = await API.post("/auth/login", form);
    //         localStorage.setItem("token", res.data.token); //caall token
    //         const userRes = await API.get("/auth/me");  //call /me API
    //         localStorage.setItem("user", JSON.stringify(userRes.data)); //store user
    //         navigate("/"); // redirect home

    //     } catch (err) {
    //         setError(err.response?.data?.msg || "Something went wrong");
    //     }
    // };

    return (
        <div className="auth-container">
            <h2>Login</h2>

            <form onSubmit={formik.handleSubmit}>
                {formik.errors.general && (
                    <p className="error-text">{formik.errors.general}</p>
                )}


                <Input name="email" placeholder="Email" formik={formik} />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    formik={formik}
                />
                {/* EMAIL */}
                {/* <input
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="error-text">{formik.errors.email}</p>
                )}

                {/* PASSWORD */}
                {/* <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="error-text">{formik.errors.password}</p>
                )} */} 

                <button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;