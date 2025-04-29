import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import TasksPage from "./pages/TasksPage";
import HomePage from "./pages/HomePage";

const HomeOrTasks = () => {
  const { token } = useContext(AuthContext);
  return token ? <TasksPage /> : <HomePage />;
};

export default HomeOrTasks;
