import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageComponent from "../../components/core/PageComponent";
import MemberModal from "../../components/modals/MemberModal";
import BtnGroup from "../../components/core/BtnGroup";
import { useStateContext } from "../../contexts/ContextProvider";
import useWorker from "../../shares/worker";
import Pagination from "../../components/core/Pagination";

export default function Workers() {
  const { workers } = useStateContext();
  const [data, setData] = useState([]);
  const { allWorkers, deleteWorker } = useWorker();
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    setLoading(true);
    deleteWorker(id);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    allWorkers();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <PageComponent title="Liste des ouvriers" loading={loading}>
        <BtnGroup title="Nouveau" create={true} link="/workers/create" />
        {data && (
          <>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Téléphone</th>
                    <th scope="col">Role</th>
                    <th scope="col">Departement</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((worker, i) => (
                    <tr key={worker._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{worker.firstName}</td>
                      <td>{worker.lastName}</td>
                      <td>{worker.phone}</td>
                      <td>{worker.role}</td>
                      <td>{worker.department.name}</td>
                      <td>
                        <a href="#" title="Voir plus">
                          <i className="fa fa-eye text-secondary"></i>
                        </a>
                        <Link to={`/workers/${worker._id}`} title="Modifier">
                          <i className="fa fa-edit text-primary mx-3"></i>
                        </Link>
                        <a
                          onClick={() => handleDelete(worker._id)}
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
            <Pagination paginateLimit={10} data={workers} setData={setData} />
          </>
        )}
      </PageComponent>
    </>
  );
}
