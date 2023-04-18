import { useStateContext } from "../../contexts/ContextProvider";
import apiClient from "../../axios";

export default function useDepartment() {
  const { setDepartments, notify } = useStateContext();

  const allDepartments = async () => {
    let response = await apiClient.get("/departments");
    // console.log(response.data);
    setDepartments(response.data);
  };

  const findDepartment = async (id) => {
    let response = await apiClient.get(`/departments/${id}`);
    // console.log(response.data);
    return response.data;
  };

  const deleteDepartment = async (id) => {
    await apiClient.delete(`/departments/${id}`);
    await allDepartments();

    notify(`Departement supprimer avec succès`);
  };

  const updateDepartment = async (id, data) => {
    let state = null;

    await apiClient
      .put(`/departments/${id}`, data)
      .then(() => {
        notify("Departement modifier avec succès");
        state = true;
      })
      .catch((err) => {
        console.log(err.response);
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

  const createDepartment = async (data) => {
    let state = null;

    await apiClient
      .post("/departments", data)
      .then(() => {
        notify("Departement créer avec succès");
        state = true;
      })
      .catch((err) => {
        console.log(err.response);
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
    allDepartments,
    findDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
}
