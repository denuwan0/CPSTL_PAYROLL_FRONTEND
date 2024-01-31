import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import User from "./components/UserTest";
import UserDetail from "./components/UserDetail";
import EmpSpecialRate from "./components/EmpSpecialRate";
import SpecialTaxEmp from "./components/SpecialTaxEmp";
import TaxCalculationForm from "./components/TaxCalculationForm";
import TaxCalculation from "./components/TaxCalculation";
import PayCode from "./components/PayCode";
import Control from "./components/Control";
import UserForm from "./components/UserForm";
import Profile from "./components/Profile";
import Paysheet from "./components/Paysheet";
import ControlDetail from "./components/ControlDetail";
import ProcessFlow from "./components/ProcessFlow";
import PayrollState from "./components/PayrollState";
import ProcessPayroll from "./components/ProcessPayroll";
import PayCodeForm from "./components/PaycodeForm";
import SpecialTaxEmpCreate from "./components/SpecialTaxEmpCreate";

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
    path: "/EmpSpecialRate",
    element: <EmpSpecialRate />,
  },
  {
    path: "/PayCode",
    element: <PayCode />,
  },
  {
    path: "/TaxCalculation",
    element: <TaxCalculation />,
  },
  {
    path: "/TaxCalculation/create",
    element: <TaxCalculationForm />,
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
  {
    path: "/Payroll/process",
    element: <ProcessPayroll />,
  },
  {
    path: "/Payroll/wizard",
    element: <ProcessFlow />,
  },
  {
    path: "/PayrollState",
    element: <PayrollState />,
  },
  {
    path: "/PayCode/create",
    element: <PayCodeForm />,
  },
  {
    path: "/SpecialTaxEmp/create",
    element: <SpecialTaxEmpCreate />,
  },
  {
    path: "/SpecialTaxEmp",
    element: <SpecialTaxEmp />,
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
