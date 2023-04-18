import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const StateContext = createContext({
  departments: [],
  setDepartments: () => {},
  members: [],
  setMembers: () => {},
  workers: [],
  setWorkers: () => {},
  users: [],
  setUsers: () => {},
  currentUser: {},
  setCurrentUser: () => {},
  userToken: null,
  setUserToken: () => {},
  notify: (message, type = "success") => {},
});

export const ContextProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [members, setMembers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("token") || null
  );

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    _setUserToken(token);
  };

  const logout = () => {
    localStorage.clear();

    setTimeout(() => {
      setUserToken("");
      setCurrentUser({});
    }, 2000);
  };

  const notify = (message, type = "success") => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: type,
    });
  };

  return (
    <StateContext.Provider
      value={{
        departments,
        setDepartments,
        members,
        setMembers,
        workers,
        setWorkers,
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        logout,
        notify,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
