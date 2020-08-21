import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { login } from "../helpers/auth";

const Login = () => {
  const [errorMessage, updateErrorMessage] = useState();
  const [email, updateEmail] = useState();
  const [password, updatePassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateErrorMessage(null)
    try {
      await login(email, password);
    } catch (error) {
      updateErrorMessage(error.message);
    }
  }

  return (
    <section>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>
          Login to Guild Chat
        </h1>
        <p>
          Fill in the form below to login to your account.
        </p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={e => updateEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={e => updatePassword(e.target.value)}
            value={password}
            type="password"
          />
        </div>
        <div>
          {
          errorMessage && <p className="text-danger">{errorMessage}</p>
          }
          <button type="submit">Login</button>
        </div>
        <hr />
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;