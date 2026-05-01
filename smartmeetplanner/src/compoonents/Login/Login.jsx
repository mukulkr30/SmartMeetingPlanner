import { useState } from "react";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";
import { AuthCard } from "./AuthCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    

    const handleLogin = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_LOGIN_URI}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const token = await res.text();

        console.log(token);

        if (res.ok) {
            localStorage.setItem("token", token);
            navigate("/");
        } else {
            alert("Invalid credentials");
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
};

    return (
        <AuthCard
        title="MeetingAI"
        subtitle="Transform meetings into actionable tasks"
        footer={
            <>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
                Sign up
            </Link>
            </>
        }
        >
        <InputField
            label="Email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
        />

        <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
        />

        <PrimaryButton text="Sign In" onClick={handleLogin} />
        {/* for future version upgrade */}
        {/* <div className="text-center mt-3">
            <Link to="/forgot" className="text-blue-600 text-sm">
            Forgot password?
            </Link>
        </div> */}
        </AuthCard>
    );
}