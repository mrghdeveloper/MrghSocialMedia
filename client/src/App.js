import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Bookmark from "./pages/bookmark/Bookmark";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>
        <Route path="/profile/:username" element={user ? <Profile /> : <Register />} />
        <Route path="/bookmarks/:userId" element={user ? <Bookmark /> : <Register />} />
      </Routes>
    </Router>
  );
}
export default App;
