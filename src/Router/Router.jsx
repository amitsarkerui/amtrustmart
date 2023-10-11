import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/Signup";
import Login from "../pages/Login/Login";
import UpdateProfile from "../pages/Update Profile/UpdateProfile";
import PrivateRoutes from "../Routes/PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoutes>
            <UpdateProfile></UpdateProfile>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp></SignUp>,
  },
  {
    path: "/sign-in",
    element: <Login></Login>,
  },
]);
