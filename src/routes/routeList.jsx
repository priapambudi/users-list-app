import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import DetailUser from "../pages/DetailUser";
import ProtectedRoute from "./ProtectedRoute";

export const routeList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "user/:id",
    element: (
      <ProtectedRoute>
        <DetailUser />
      </ProtectedRoute>
    ),
  },
];
