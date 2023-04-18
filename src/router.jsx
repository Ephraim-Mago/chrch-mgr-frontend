import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import Dashboard from "./views/Dashboard";
import Members from "./views/member/Members";
import MemberView from "./views/member/MemberView";
import Reports from "./views/report/Reports";
import ReportView from "./views/report/ReportView";
import Departments from "./views/department/Departments";
import DepartmentView from "./views/department/DepartmentView";
import Statistics from "./views/report/Statistics";
import Workers from "./views/worker/Workers";
import WorkerView from "./views/worker/WorkerView";
import Settings from "./views/setting/Settings";
import Users from "./views/setting/user/Users";
import UserView from "./views/setting/user/UserView";
import MemberDetails from "./views/member/MemberDetails";
import SetAccess from "./views/setting/user/SetAccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/members",
        element: <Members />,
      },
      {
        path: "/members/create",
        element: <MemberView />,
      },
      {
        path: "/members/:id",
        element: <MemberView />,
      },
      {
        path: "/members/view/:id",
        element: <MemberDetails />,
      },
      {
        path: "/workers",
        element: <Workers />,
      },
      {
        path: "/workers/create",
        element: <WorkerView />,
      },
      {
        path: "/workers/:id",
        element: <WorkerView />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/reports/create",
        element: <ReportView />,
      },
      {
        path: "/reports/:id",
        element: <ReportView />,
      },
      {
        path: "/departments",
        element: <Departments />,
      },
      {
        path: "/departments/create",
        element: <DepartmentView />,
      },
      {
        path: "/departments/:id",
        element: <DepartmentView />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/settings/users",
        element: <Users />,
      },
      {
        path: "/settings/users/new-access",
        element: <SetAccess />,
      },
      {
        path: "/settings/users/:id",
        element: <UserView />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
