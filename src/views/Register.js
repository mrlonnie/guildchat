import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { register } from "../helpers/auth";

const Register = () => {
  const [errorMessage, updateErrorMessage] = useState();
  const [email, updateEmail] = useState();
  const [password, updatePassword] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();
    updateErrorMessage(null)
    try {
      await register(email, password);
    } catch (error) {
      updateErrorMessage(error.message);
    }
  }

  return (
    <section>
      <form
        onSubmit={handleSubmit}
      >
        <h1>
          Register Account
        </h1>
        <p>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={updateEmail}
            value={email}/>
        </p>
        <p>
          <input
            placeholder="Password"
            name="password"
            onChange={updatePassword}
            value={password}
            type="password"/>
        </p>
        <p>
          {
          errorMessage && <p className="text-danger">{errorMessage}</p>
          }
          <button type="submit">
            Sign up
          </button>
        </p>
        <hr></hr>
        <p>Already Registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  )
}

export default Register;
