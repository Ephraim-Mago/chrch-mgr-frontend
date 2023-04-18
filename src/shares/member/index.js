import { useStateContext } from "../../contexts/ContextProvider";
import apiClient from "../../axios";

export default function useMember() {
  const { setMembers, notify, currentUser } = useStateContext();

  const allMembers = async () => {
    let response = await apiClient.get("/members");
    // console.log(response.data);
    setMembers(response.data);
  };

  const findMember = async (id) => {
    let response = await apiClient.get(`/members/${id}`);
    // console.log(response.data);
    return response.data;
  };

  const deleteMember = async (id) => {
    await apiClient.delete(`/members/${id}`);
    await allMembers();

    notify(`Membre supprimer avec succès`);
  };

  const updateMember = async (id, data) => {
    let state = null;

    await apiClient
      .put(`/members/${id}`, data)
      .then(() => {
        notify("Membre modifier avec succès");
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

  const createMember = async (data) => {
    let state = null;

    await apiClient
      .post("/members", { ...data, workers: [currentUser.worker._id] })
      .then(() => {
        notify("Membre créer avec succès");
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

  const canaux = (value = []) => {
    return value.map((item) => `${item.firstName} ${item.lastName}`).join(", ");
  };

  return {
    createMember,
    allMembers,
    findMember,
    updateMember,
    deleteMember,
    canaux,
  };
}
