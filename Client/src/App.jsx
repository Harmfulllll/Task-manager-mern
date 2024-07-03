import React from "react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import AuthNeed from "./AuthNeed";
import TaskManager from "./pages/Tasks/Tasks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { auth } = useSelector((state) => ({ ...state }));
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!auth.currentUser ? <Login /> : <TaskManager />}
        />
        <Route
          path="/register"
          element={!auth.currentUser ? <Register /> : <TaskManager />}
        />
        <Route
          path="/task"
          element={
            <AuthNeed>
              <TaskManager />
            </AuthNeed>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
