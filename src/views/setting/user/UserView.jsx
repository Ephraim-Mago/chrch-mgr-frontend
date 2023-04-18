import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BtnGroup from "../../../components/core/BtnGroup";
import PageComponent from "../../../components/core/PageComponent";
import { formCheCkValidate } from "../../../helpers";
import useUser from "../../../shares/user";

export default function UserView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { findUser, updateUser } = useUser();
  const [data, setData] = useState({
    worker: {},
    email: "",
    isAdmin: true,
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState({ __html: "" });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError({ __html: "" });
    setLoading(false);

    const forms = document.querySelectorAll(".needs-validation");

    if (formCheCkValidate(forms, event)) {
      if (data.password !== "" && data.password !== data.confirm_password) {
        setError({ __html: "Mot de passe incorrecte" });
        return;
      }

      setLoading(true);

      (async () => {
        const payload = { ...data };
        if (payload.password === "") {
          delete payload.password;
        }

        delete payload.confirm_password;
        delete payload.worker;

        (await updateUser(id, payload))
          ? navigate("/settings/users")
          : setLoading(false);
      })();
    }
  };

  useEffect(() => {
    if (id) {
      setShow(true);

      (async () => {
        let user = await findUser(id);
        setData({ ...data, ...user });
        setTimeout(() => {
          setShow(false);
        }, 2000);
      })();
    }
  }, []);

  return (
    <>
      <PageComponent title="Edition d'un utilisateur" loading={show}>
        <BtnGroup link="/settings/users" title="Back" />

        <div className="mb-5">
          <p className="fs-4">Information provenant du compte concerné</p>
          <div className="row">
            <label htmlFor="staticFistName" className="col-sm-2 col-form-label">
              Prenom
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                readOnly={true}
                className="form-control-plaintext"
                id="staticFistName"
                value={data.worker ? data.worker.firstName : ""}
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="staticLastName" className="col-sm-2 col-form-label">
              Nom
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                readOnly={true}
                className="form-control-plaintext"
                id="staticLastName"
                value={data.worker ? data.worker.lastName : ""}
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                readOnly={true}
                className="form-control-plaintext"
                id="staticEmail"
                value={data.email}
              />
            </div>
          </div>
        </div>

        {error.__html && (
          <div
            className="alert alert-danger"
            role="alert"
            dangerouslySetInnerHTML={error}
          ></div>
        )}

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <p className="fs-4">Information modifiable du compte</p>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Permission</label>
              <div className="d-flex">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="admin"
                    id="flexRadioDefault1"
                    value={true}
                    onChange={() =>
                      setData({ ...data, isAdmin: !data.isAdmin })
                    }
                    checked={data.isAdmin}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Administrateur
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="admin"
                    id="flexRadioDefault2"
                    value={false}
                    onChange={() =>
                      setData({ ...data, isAdmin: !data.isAdmin })
                    }
                    checked={!data.isAdmin}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Standard
                  </label>
                </div>
              </div>
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="password" className="form-label">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
            <div className="col">
              <label htmlFor="town" className="form-label">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm_password"
                name="confirm_password"
                value={data.confirm_password}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Link to="/settings/users" className="btn btn-danger me-2">
              Annuler
            </Link>
            <button type="submit" className="btn btn-primary">
              {loading ? (
                <div
                  className="spinner-border text-light me-2"
                  style={{ width: "1rem", height: "1rem" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <i className="fa fa-save me-2" aria-hidden="true"></i>
              )}
              Enregister
            </button>
          </div>
        </form>
      </PageComponent>
    </>
  );
}
