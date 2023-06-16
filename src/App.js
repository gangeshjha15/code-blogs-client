import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
// import TestLogin from "./components/account/TestLogin";
import NewHeader from "./components/header/NewHeader";
import CreatePost from "./components/posts/CreatePost";
import DetailView from "./components/details/DetailView";
import UpdatePost from "./components/posts/UpdatePost";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import TestHome from "./components/home/TestHome";
import Profile from "./components/profile/Profile";
import Login from "./components/account/Login";

import { Provider } from "react-redux";
import store from "./store/store";
import UserPosts from "./components/home/userPosts/UserPosts";
import Signup from "./components/account/Signup";
import { ForgetPassword } from "./components/forgetPassword/ForgetPassword";
import SavedBlogs from "./components/home/savedBlogs/SavedBlogs";

const PrivateRoute = ({ isUserAuth }) => {
  return isUserAuth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isUserAuth, setIsUserAuth] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <NewHeader setIsUserAuth={setIsUserAuth} isUserAuth={isUserAuth} />
          <Routes>
            {/* <Route path="/login" element={<TestLogin setIsUserAuth={setIsUserAuth} />} /> */}
            <Route
              path="/login"
              element={<Login setIsUserAuth={setIsUserAuth} />}
            />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/" element={<TestHome />} />

            <Route
              path="/create"
              element={<PrivateRoute isUserAuth={isUserAuth} />}
            >
              <Route path="/create" element={<CreatePost />} />
            </Route>

            {/* get user all posts */}
            <Route
              path="/user/posts"
              element={<PrivateRoute isUserAuth={isUserAuth} />}
            >
              <Route path="/user/posts" element={<UserPosts />} />
            </Route>
            
            {/* get All Bookmarked blogs */}
            <Route
              path="/user/get-all-bookmarked-blogs"
              element={<PrivateRoute isUserAuth={isUserAuth} />}
            >
              <Route path="/user/get-all-bookmarked-blogs" element={<SavedBlogs />} />
            </Route>

            <Route path="/details/:id" element={<DetailView />} />

            <Route
              path="/update/:id"
              element={<PrivateRoute isUserAuth={isUserAuth} />}
            >
              <Route path="/update/:id" element={<UpdatePost />} />
            </Route>

            <Route path="/about" element={<About />} />

            <Route path="/contact" element={<Contact />} />

            <Route
              path="/profile"
              element={<PrivateRoute isUserAuth={isUserAuth} />}
            >
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        <ToastContainer position="top-center" autoClose={2000} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
