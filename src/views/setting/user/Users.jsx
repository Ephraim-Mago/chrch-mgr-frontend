import { Link } from "react-router-dom";
import BtnGroup from "../../../components/core/BtnGroup";
import PageComponent from "../../../components/core/PageComponent";
import useUser from "../../../shares/user";
import { useEffect, useState } from "react";
import Pagination from "../../../components/core/Pagination";

export default function Users() {
  const { allUsers, users, deleteUser } = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteUser(id);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    (async () => {
      await allUsers();

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    })();
  }, []);

  return (
    <>
      <PageComponent title="Liste des utilisateurs" loading={loading}>
        <BtnGroup
          title="Attribuer un accès"
          create={true}
          link="/settings/users/new-access"
        />

        {data && (
          <>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Permission</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, k) => (
                    <tr key={user._id}>
                      <th scope="row">{k + 1}</th>
                      <td>{user.worker.firstName}</td>
                      <td>{user.worker.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? "Admin" : "Standard"}</td>
                      <td>Active</td>
                      <td>
                        <Link
                          to={`/settings/users/${user._id}`}
                          title="Modifier"
                        >
                          <i className="fa fa-edit text-primary me-3"></i>
                        </Link>
                        <a
                          onClick={() => handleDelete(user._id)}
                          title="Supprimer"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination data={users} paginateLimit={10} setData={setData} />
          </>
        )}
      </PageComponent>
    </>
  );
}
