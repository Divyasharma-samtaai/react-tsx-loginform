import React, { useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/AuthSlice";
import type { AppDispatch, RootState } from "../redux/Store";

interface Errors {
  username?: string;
  password?: string;
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [errors, setErrors] = useState<Errors>({});
  // const [formError, setFormError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    //  if (!username.trim() && !password.trim()) {
    //    setFormError("Both fields are required");
    //  } else {
    //    setFormError("");
    //  }

    setErrors(newErrors);

    // Stop submit if errors exist
    if (Object.keys(newErrors).length > 0) return;

    dispatch(loginUser({ username, password }));
  };

  if (isAuthenticated) {
    return (
      <div className="login-container">
        <h2>Login successful </h2>
      </div>
    );
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="form-error">{error}</p>}

        {/* {formError && <p className="form-error">{formError}</p>} */}

        {/* Username */}
        <label htmlFor="username" className="login-label">
          Username
        </label>

        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
            setErrors((prev) => ({ ...prev, username: undefined }));
            // setFormError("");
          }}
          className={errors.username ? "error-input" : ""}
        />
        {errors.username && <p className="error-text">{errors.username}</p>}

        {/* Password */}
        <label htmlFor="password" className="login-label">
          Password
        </label>

        <div className="password-container">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
              // setFormError("");
            }}
            className={errors.password ? "error-input" : ""}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit" className="submitbtn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
