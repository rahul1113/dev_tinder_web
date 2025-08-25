import React, { useState } from "react";
//import { useLoginForm } from "../hooks/mutation/useLoginForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/user";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/utils";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const payload = isLoginForm
        ? {
            email: loginForm.email,
            password: loginForm.password,
          }
        : {
            firstName: loginForm.firstName,
            lastName: loginForm.lastName,
            email: loginForm.email,
            password: loginForm.password,
            age: loginForm.age,
            gender: loginForm.gender,
          };

      const url = isLoginForm ? BASE_URL + "/login" : BASE_URL + "/signup";

      const res = await axios.post(url, payload, { withCredentials: true });

      dispatch(setUser(isLoginForm ? res.data : res.data.data));
      return navigate(isLoginForm ? "/" : "/profile");
    } catch (err: any) {
      setError(err?.response?.data);
      console.error("Error during authentication:", err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm mx-auto mt-1 ">
      <div
        className={`card-body ${
          !isLoginForm ? "flex flex-col gap-2 justify-center items-center" : ""
        }`}
      >
        <h2 className="card-title justify-center">
          {!isLoginForm ? "Sign Up" : "Login"}
        </h2>
        {!isLoginForm && (
          <>
            <label className="input validator">
              <input
                type="text"
                placeholder="First Name"
                required
                value={loginForm.firstName}
                onChange={(e) => {
                  setLoginForm({
                    ...loginForm,
                    firstName: e.target.value,
                  });
                }}
              />
            </label>
            <label className="input validator">
              <input
                type="text"
                placeholder="Last Name"
                required
                value={loginForm.lastName}
                onChange={(e) => {
                  setLoginForm({
                    ...loginForm,
                    lastName: e.target.value,
                  });
                }}
              />
            </label>
            <label className="input validator">
              <input
                type="text"
                placeholder="age"
                required
                value={loginForm.age}
                onChange={(e) => {
                  setLoginForm({
                    ...loginForm,
                    age: e.target.value,
                  });
                }}
              />
            </label>
            <label className="input validator">
              <input
                type="text"
                placeholder="gender"
                required
                value={loginForm.gender}
                onChange={(e) => {
                  setLoginForm({
                    ...loginForm,
                    gender: e.target.value,
                  });
                }}
              />
            </label>
          </>
        )}
        <div
          className={` ${
            isLoginForm
              ? "flex flex-col gap-2 justify-center items-center"
              : "w-80"
          }`}
        >
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              value={loginForm.email}
              onChange={(e) => {
                setLoginForm({
                  ...loginForm,
                  email: e.target.value,
                });
              }}
            />
          </label>

          <p className="validator-hint">
            Must be 3 to 30 characters
            <br />
            containing only letters, numbers or dash
          </p>

          <label className={`input validator ${isLoginForm ? "" : "-mt-13"}`}>
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => {
                setLoginForm({
                  ...loginForm,
                  password: e.target.value,
                });
              }}
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
        </div>
        <div>{error && <p className="text-red-500">{error}</p>}</div>
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={handleLogin}>
            {!isLoginForm ? "Sign Up" : "Login"}
          </button>
        </div>
        <button
          onClick={() => setIsLoginForm((prev) => !prev)}
          className="btn btn-link"
        >
          {!isLoginForm
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Login;
