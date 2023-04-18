import { useStateContext } from "../../contexts/ContextProvider";
import apiClient from "../../axios";

export default function useUser() {
  const { setUsers, users, notify } = useStateContext();

  const allUsers = async () => {
    let response = await apiClient.get("/users");
    // console.log(response.data);
    setUsers(response.data);
  };

  const findUser = async (id) => {
    let response = await apiClient.get(`/users/${id}`);
    // console.log(response.data);
    return response.data;
  };

  const deleteUser = async (id) => {
    await apiClient.delete(`/users/${id}`);
    await allUsers();

    notify(`Accès utilisateur supprimer avec succès`);
  };

  const updateUser = async (id, data) => {
    let state = null;

    await apiClient
      .put(`/users/${id}`, data)
      .then(() => {
        notify("Accès utilisateur modifier avec succès");
        state = true;
      })
      .catch((err) => {
        console.log(err);
        state = false;
        if (err.response) {
          const finalErrors = [];
          for (const property in err.response.data.errors) {
            finalErrors.push(err.response.data.errors[property].message);
          }
          notify(finalErrors.join("<br>"), "error");
        }
      });

    return state;
  };

  const createUser = async (data) => {
    let state = null;

    await apiClient
      .post("/users", data)
      .then(() => {
        notify("Accès utilisateur créer avec succès");
        state = true;
      })
      .catch((err) => {
        console.log(err);
        state = false;
        if (err.response) {
          const finalErrors = [];
          for (const property in err.response.data.errors) {
            finalErrors.push(err.response.data.errors[property].message);
          }
          notify(finalErrors.join("<br>"), "error");
        }
      });

    return state;
  };

  return {
    users,
    allUsers,
    findUser,
    createUser,
    updateUser,
    deleteUser,
  };
}
