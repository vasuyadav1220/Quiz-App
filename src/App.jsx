import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './Components/Login';
import AdminDash from './admin/AdminDash.jsx';
import AdminHome from './admin/AdminHome.jsx';
import AllQuiz from './admin/AllQuiz.jsx';
import AllUsers from './admin/AllUsers.jsx';
import AddQuiz from './Admin/AddQuiz.jsx';
import Leaderboard from './Admin/Leaderboard.jsx';
import AddUser from './admin/AddUser.jsx'
import { ToastContainer, Bounce } from 'react-toastify'
import Quizes from './admin/Quizes.jsx'
import Register from './Components/Register.jsx'

function App() {

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path='/admin_dash' element={<AdminDash />} >
          <Route index element={<AdminHome></AdminHome>} ></Route>
          <Route path='admin_home' element={<AdminHome></AdminHome>} ></Route>
          <Route path='all_quiz' element={<AllQuiz></AllQuiz>} ></Route>
          <Route path='all_users' element={<AllUsers></AllUsers>} ></Route>
          <Route path='add_quiz' element={<AddQuiz></AddQuiz>} ></Route>
          <Route path='leaderboard' element={<Leaderboard></Leaderboard>} ></Route>
          <Route path='add_user' element={<AddUser></AddUser>} ></Route>
          <Route path='all_quizes' element={<Quizes></Quizes>} ></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
