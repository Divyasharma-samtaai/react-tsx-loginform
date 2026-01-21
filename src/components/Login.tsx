import React, { useState } from "react";
import "./Login.css";

interface Errors {
  username?: string;
  password?: string;
}

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Errors = {};

    // Field-level validation
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Form-level validation
    if (!username.trim() && !password.trim()) {
      setFormError("Both fields are required");
    } else {
      setFormError("");
    }

    setErrors(newErrors);

    // Stop submit if errors exist
    if (Object.keys(newErrors).length > 0) return;

    alert("Login successful");

    // Clear form fields
    setUsername("");
    setPassword("");
    setErrors({});
    setFormError("");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {formError && <p className="form-error">{formError}</p>}

        <label htmlFor="username" className="login-label">
          Username
        </label>
        {/* Username */}
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
            setErrors((prev) => ({ ...prev, username: undefined }));
            setFormError("");
          }}
          className={errors.username ? "error-input" : ""}
        />
        {errors.username && <p className="error-text">{errors.username}</p>}

        <label htmlFor="password" className="login-label">
          Password
        </label>

        {/* Password */}
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: undefined }));
            setFormError("");
          }}
          className={errors.password ? "error-input" : ""}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
