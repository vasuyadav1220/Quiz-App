import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config.js';
import { Bounce, toast } from 'react-toastify';

export default function Login() {

  const nav = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // const submitHandler = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const querySnapShot = await getDocs(collection(db, "admin"))
  //     let users = []

  //     querySnapShot.forEach((doc) => {
  //       users.push({ id: doc.id, data: doc.data() })
  //     })

  //     const find = users.find(
  //       (v) => v.data.email === email && v.data.password === password
  //     )

  //     if (find) {
  //       localStorage.setItem("userLoggedIn", true)
  //       localStorage.setItem("userId", find.id)
  //       toast.success('Login Successfully', {
  //         position: "top-center",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //         transition: Bounce,
  //       });

  //       nav('/admin_dash')

  //     } else {
  //       setError("Invalid email or password")
  //        toast.error(error, {
  //         position: "top-center",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //         transition: Bounce,
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err)
  //     setError("Something went wrong")
  //   }

  //   setLoading(false)
  // }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const adminSnap = await getDocs(collection(db, "admin"));
      let adminList = [];

      adminSnap.forEach((doc) => {
        adminList.push({ id: doc.id, ...doc.data() });
      });

      let user = adminList.find(
        (v) => v.email === email && v.password === password
      );

      if (!user) {
        const userSnap = await getDocs(collection(db, "users"));
        let userList = [];

        userSnap.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });

        user = userList.find(
          (v) => v.email === email && v.password === password
        );
      }

      if (user) {
        localStorage.setItem("userLoggedIn", true);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("role", user.role);

        toast.success("Login Successfully", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });

        if (user.role === "admin") {
          nav("/admin_dash");
        } else if (user.role === "user") {
          nav("/user_dash");
        }

      } else {
        toast.error("Invalid email or password", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }

    setLoading(false);
  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '350px' }}>
        <h4 className="text-center mb-3">Login</h4>

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 shadow"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div>
            <NavLink to={'/register'} >Register</NavLink>
          </div>
        </form>

      </div>
    </div>
  )
}
