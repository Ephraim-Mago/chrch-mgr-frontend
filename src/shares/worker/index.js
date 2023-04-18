import { useStateContext } from "../../contexts/ContextProvider";
import apiClient from "../../axios";

export default function useWorker() {
  const { setWorkers, notify } = useStateContext();

  const allWorkers = async () => {
    let response = await apiClient.get("/workers");
    // console.log(response.data);
    setWorkers(response.data);
  };

  const findWorker = async (id) => {
    let response = await apiClient.get(`/workers/${id}`);
    // console.log(response.data);
    return response.data;
  };

  const deleteWorker = async (id) => {
    await apiClient.delete(`/workers/${id}`);
    await allWorkers();

    notify(`Ouvrier supprimer avec succès`);
  };

  const updateWorker = async (id, data) => {
    let state = null;

    await apiClient
      .put(`/workers/${id}`, data)
      .then(() => {
        notify("Ouvrier modifier avec succès");
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

  const createWorker = async (data) => {
    let state = null;

    await apiClient
      .post("/workers", data)
      .then(() => {
        notify("Ouvrier créer avec succès");
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
    createWorker,
    allWorkers,
    findWorker,
    updateWorker,
    deleteWorker,
  };
}
