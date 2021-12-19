import { useState } from "react";
const Auth = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(false);
  const [isLogin, setLogin] = useState(true);

  const handleSubmit = () => {
    if (!isLogin && password !== confirmPassword) {
      setError(true);
      return;
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box" Auth>
        <div className="auth-container-form" Auth>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          {!isLogin && (
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Repeat your password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              value={confirmPassword}
            />
          )}
          <button onClick={handleSubmit}>Submit</button>
          {error && (
            <p className="error-message">
              Your passwords do not match, please try again.
            </p>
          )}
        </div>

        <div className="auth-options">
          <button
            style={{ backgroundColor: !isLogin ? "#070a0d" : "#151a1f" }}
            onClick={() => {
              setLogin(true);
              setError(false);
            }}
          >
            Login
          </button>
          <button
            style={{ backgroundColor: isLogin ? "#070a0d" : "#151a1f" }}
            onClick={() => setLogin(false)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
