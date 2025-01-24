import { Route, Routes, useNavigate, Navigate, Outlet } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import MainView from "./components/MainView";
import Sidebar from "./components/Sidebar";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { jwtVerify, SignJWT } from "jose";
import useAuthStore from "../../store/authentication/authStore";

function Dashboard() {
  const {sessionToken: token, handleSessionToken} = useAuthStore()

  const sessionToken = token || localStorage.getItem("sessionToken");


  useEffect(() => {
    console.log("SESSIONTOKEN FROM DASHBOARD: ", sessionToken)
    handleSessionToken(sessionToken);
  }, []);

  return (
    <>
      {sessionToken ? (
        <main className="relative ">
          <Outlet />
          <Sidebar />
        </main>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
}

export default Dashboard;
