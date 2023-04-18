import PageComponent from "../../components/core/PageComponent";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Settings() {
  const { currentUser, departments } = useStateContext();

  return (
    <>
      <PageComponent title="Paramètres" loading={false}>
        <div className="row align-items-md-stretch g-5">
          <div className="col">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5 className="">Informations de connexion</h5>
              </div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className="mb-3">
                  <i className="fa fa-user-circle fa-5x position-relative"></i>
                  <span className="position-absolute top-3 start-3 translate-middle-x p-3 bg-success border border-light rounded-circle"></span>
                </div>
                <div className="text-center">
                  <p className="fw-bold mb-1">{`${currentUser.worker.firstName} ${currentUser.worker.lastName}`}</p>
                  <p className="p-0 m-0 fw-light fs-6">
                    Permission : {currentUser.isAdmin ? "Admin" : "Standard"}
                  </p>
                  <p className="p-0 m-0 fw-bold fs-6">
                    <span>{currentUser.worker.role}</span>
                    {", "}
                    <span>
                      {
                        departments.find(
                          (item) => item._id == currentUser.worker.department
                        ).name
                      }
                    </span>
                  </p>
                  <div className="mt-3">
                    <p className="mb-1">
                      {[
                        currentUser.worker.email,
                        currentUser.worker.phone,
                      ].join(", ")}
                    </p>
                    <p>
                      {[
                        currentUser.worker.address,
                        currentUser.worker.town,
                        currentUser.worker.city,
                        currentUser.worker.country,
                      ].join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="p-5 text-bg-dark rounded-3">
              <h2>Accès rapide</h2>
              <Link to="/settings/users" className="btn btn-outline-light me-2">
                Gérer les accès utilisateurs
              </Link>
            </div>
          </div>
        </div>
      </PageComponent>
    </>
  );
}
