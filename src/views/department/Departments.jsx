import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageComponent from "../../components/core/PageComponent";
import BtnGroup from "../../components/core/BtnGroup";
import { useStateContext } from "../../contexts/ContextProvider";
// import apiClient from "../../axios";
import useDepartment from "../../shares/department";
import Pagination from "../../components/core/Pagination";

export default function Departments() {
  const { departments } = useStateContext();
  const { allDepartments, deleteDepartment } = useDepartment();
  const [data, setData] = useState([]);
  const [first, setFirst] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    setLoading(true);
    deleteDepartment(id);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (first) {
      allDepartments();

      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setFirst(false);
    }
  }, []);

  return (
    <>
      <PageComponent title="Liste des departements" loading={loading}>
        <BtnGroup title="Nouveau" create={true} link="/departments/create" />
        {data && (
          <>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((department, i) => (
                      <tr key={department._id}>
                        <th scope="row">{i + 1}</th>
                        <td>{department.name}</td>
                        <td>{department.role}</td>
                        <td>
                          <Link
                            to={`/departments/${department._id}`}
                            title="Modifier"
                          >
                            <i className="fa fa-edit text-primary me-3"></i>
                          </Link>
                          <a
                            onClick={() => handleDelete(department._id)}
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
            <Pagination
              paginateLimit={10}
              data={departments}
              setData={setData}
            />
          </>
        )}
      </PageComponent>
    </>
  );
}
