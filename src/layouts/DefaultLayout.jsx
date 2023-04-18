import { Navigate, Outlet } from "react-router-dom";
import "./default.css";
import Header from "../components/core/Header";
import { ToastContainer } from "react-toastify";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import useMember from "../shares/member";
import useDepartment from "../shares/department";
import useWorker from "../shares/worker";
import axiosClient from "../axios";

export default function DefaultLayout() {
  const { userToken, setCurrentUser } = useStateContext();
  const { allMembers } = useMember();
  const { allDepartments } = useDepartment();
  const { allWorkers } = useWorker();

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (userToken) {
      (async () => {
        const connected = await axiosClient.get("/auth/user");
        setCurrentUser(connected.data);
      })();

      setTimeout(() => {
        (async () => {
          await allMembers();
          await allDepartments();
          await allWorkers();
        })();
      }, 1000);
    }
  }, []);

  return (
    <>
      <Header />

      {/* Container Main start */}
      <div className="height-100 py-3 my-5">
        <Outlet />
      </div>
      {/* Container Main end */}

      <ToastContainer />
    </>
  );
}
