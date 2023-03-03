import LoginPage from "./pages/Login/LoginPage";
import UserPage from "./pages/User/UserPage";
import AdminPage from "./pages/Admin/AdminPage";
import { Routes, Route } from "react-router-dom";
import SetTask from "./pages/setTask/SetTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/set-task" element={<SetTask />} />
    </Routes>
  );
}

export default App;
