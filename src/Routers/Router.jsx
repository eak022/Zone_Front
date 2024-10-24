import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from './../pages/Register';
import Add from "../pages/Add";
import Edit from "../pages/Edit";
import PrivateRoute from "../component/PrivateRoute";

const userRole = "admin"; // คุณสามารถเปลี่ยนเพื่อดึงบทบาทผู้ใช้จาก context หรือ state ของคุณได้

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "add",
    element: (
      <PrivateRoute allowedRoles={["admin"]} userRole={userRole}>
        <Add />
      </PrivateRoute>
    ),
  },
  {
    path: "login", 
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "/edit/:storeId",
    element: (
      <PrivateRoute allowedRoles={["admin"]} userRole={userRole}>
        <Edit />
      </PrivateRoute>
    ),
  }
]);

export default router;
