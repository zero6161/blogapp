import { createBrowserRouter } from "react-router-dom";
import { Navigate, RouterProvider } from "react-router";
import Homepage from "./Pages/Homepage/HomePage";
import Loginpage from "./Pages/Loginpage/LoginPage";
import SignUp from "./Pages/SignUppage/SignUp";
import LoginHomePage from "./Pages/LoggedHomePage/LoggedHomePage";
import SlugPage from "./Pages/SlugPage/SlugPage";
import DetailFeed from "./Components/PageDetail/DetailFeed";
import ProfilePage from "./Pages/ProfilePage.jsx/ProfilePage";
import SettingUser from "./Pages/SettingUser/SettingUser";
import "./App.css";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    children: [
      {
        path: "login",
        element: <Loginpage />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "home",
    element: <LoginHomePage />,
    children: [
      {
        path: "article/:slug",
        element: <DetailFeed />,
      },
    ],
  },
  {
    path: ":usernamedetail",
    element: <ProfilePage />,
    children: [
      {
        path: "article/:slug",
        element: <DetailFeed />,
      },
    ],
  },
  {
    path: "/setting",
    element: <SettingUser />,
  },
  // {
  //   path:':slug'
  // }
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
