import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function AdminDash() {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        <div className="col-12 col-md-3 col-lg-2 bg-dark text-white p-0">
          <div className="p-3 border-bottom">
            <h5 className="mb-0">Admin Panel</h5>
          </div>

          <ul className="nav flex-column p-2">
            <li className="nav-item">
              <NavLink className="nav-link" to={'admin_home'}>
                <span className="nav-link text-white active">
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'add_user'}>
                <span className="nav-link text-white">
                  Add Users
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'add_quiz'}>
                <span className="nav-link text-white">
                  Add Quiz
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'all_users'}>
                <span className="nav-link text-white">
                  All  Users
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'all_quizes'}>
                <span className="nav-link text-white">
                  All Quiz
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'leaderboard'}>
                <span className="nav-link text-white">
                  Leaderborad
                </span>
              </NavLink>

            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/'}>
                <span className="nav-link text-white">
                  Logout
                </span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="col-12 col-md-9 col-lg-10 bg-light p-4">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}