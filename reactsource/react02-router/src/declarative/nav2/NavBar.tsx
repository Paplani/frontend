//     /HOME
//     /about -> About
//     /contact -> Contact
//     /account/login
//     /account/register

import { Link, NavLink, Route, Routes } from "react-router-dom";
import About from "./About";
import Account from "./Account";
import Contact from "./Contact";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";

const NavBar = () => {
  return (
    <div>
      <nav className="flex bg-gray-300 p-2 gap-5 h-20 items-center">
        <Link to="/">Home</Link>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/account">Account</NavLink>
        {/* <NavLink to="/account/login">Login</NavLink>
        <NavLink to="/account/register">Register</NavLink> */}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account/" element={<Account />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* 동적 파라메터 */}
          <Route path="profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default NavBar;
