import { useState } from "react";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";
import { AuthCard } from "./AuthCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    mobile: "",
    employeeId: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Success message
        alert("Registration successful!");

        // ✅ Redirect to login
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Join MeetingAI today"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Sign in
          </Link>
        </>
      }
    >
      <InputField
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />

      <InputField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <InputField
        label="Mobile"
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
      />

      <InputField
        label="Employee ID"
        name="employeeId"
        value={form.employeeId}
        onChange={handleChange}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      <PrimaryButton text="Register" onClick={handleRegister} />
    </AuthCard>
  );
}