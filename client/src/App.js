import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
        {/* even if it will be homeurl in browser it will redirect to register page bcoz user is not logged in */}
          {/* to go to home page make sure to login successfully if not then Register  */}
          {/* to go to login page make sure you r not logged in .if you r logged in go to home page similarly for register   */}
          <Route
            path="/"
            exact
            element={user ? <Home /> : <Register />}
          ></Route>

          <Route
            path="/login"
            exact
            element={user ? <Navigate to="/" /> : <Login />}
          ></Route>
          <Route
            path="/register"
            exact
            element={user ? <Navigate to="/" /> : <Register />}
          ></Route>
          <Route
            path="/messenger"
            exact
            element={!user ? <Navigate to="/" /> : <Messenger />}
          ></Route>
          {/* we wont go to profile page directly we will go there by using username */}
          <Route path="/profile/:username" exact element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
