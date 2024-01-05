import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import User from "./components/UserTest";
import UserDetail from "./components/UserDetail";
import EmpSpecialRate from "./components/EmpSpecialRate";
import SpecialTaxEmp from "./components/SpecialTaxEmp";
import Calculation from "./components/Calculation";
import TaxCalculation from "./components/TaxCalculation";
import PayCode from "./components/PayCode";
import Control from "./components/Control";
import UserForm from "./components/UserForm";
import Profile from "./components/Profile";
import Paysheet from "./components/Paysheet";
import ControlDetail from "./components/ControlDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/user/:id",
    element: <UserDetail />,
  },
  {
    path: "/calculation",
    element: <Calculation />,
  },
  {
    path: "/EmpSpecialRate",
    element: <EmpSpecialRate />,
  },
  {
    path: "/PayCode",
    element: <PayCode />,
  },
  {
    path: "/SpecialTaxEmp",
    element: <SpecialTaxEmp />,
  },
  {
    path: "/TaxCalculation",
    element: <TaxCalculation />,
  },
  {
    path: "/Control",
    element: <Control />,
  },
  {
    path: "/user/create",
    element: <UserForm />,
  },
  {
    path: "/user/profile",
    element: <Profile />,
  },
  {
    path: "/paysheet",
    element: <Paysheet />,
  },
  {
    path: "/Control/detail",
    element: <ControlDetail />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
