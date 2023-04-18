import { Link, useParams, useNavigate } from "react-router-dom";
import PageComponent from "../../components/core/PageComponent";
import BtnGroup from "../../components/core/BtnGroup";
import { useEffect, useState } from "react";
import { formCheCkValidate } from "../../helpers";
import { useStateContext } from "../../contexts/ContextProvider";
import useWorker from "../../shares/worker";

export default function WorkerView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { departments } = useStateContext();
  const { findWorker, updateWorker, createWorker } = useWorker();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    town: "",
    city: "",
    country: "",
    role: "",
    department: "",
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
      setLoading(true);

      id
        ? (async () => {
            (await updateWorker(id, data))
              ? navigate("/workers")
              : setLoading(false);
          })()
        : (async () => {
            (await createWorker(data))
              ? navigate("/workers")
              : setLoading(false);
          })();
    }
  };

  useEffect(() => {
    if (id) {
      setShow(true);

      (async () => {
        let response = await findWorker(id);
        setData({ ...response, department: response.department._id });

        setTimeout(() => {
          setShow(false);
        }, 1000);
      })();
    }
  }, []);

  return (
    <>
      <PageComponent
        title={id ? "Edition d'un ouvrier" : "Création d'un ouvrier"}
        loading={show}
      >
        <BtnGroup link="/workers" title="Back" />

        {error.__html && (
          <div
            className="alert alert-danger"
            role="alert"
            dangerouslySetInnerHTML={error}
          ></div>
        )}

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="firstNname" className="form-label">
                Prénom
              </label>
              <input
                type="text"
                className="form-control disable"
                id="firstNname"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                required={true}
              />
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
            <div className="col">
              <label htmlFor="lastName" className="form-label">
                Nom
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                required={true}
              />
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="email" className="form-label">
                Adresse e-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required={true}
              />
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
            <div className="col">
              <label htmlFor="phone" className="form-label">
                Numéro de téléphone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                required={true}
              />
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="address" className="form-label">
                Adresse
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={data.address}
                onChange={handleChange}
                required={true}
              />
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
            <div className="col">
              <label htmlFor="town" className="form-label">
                Commune
              </label>
              <input
                type="text"
                className="form-control"
                id="town"
                name="town"
                value={data.town}
                onChange={handleChange}
                required={true}
              />
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="city" className="form-label">
                Ville
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={data.city}
                onChange={handleChange}
                required={true}
              />
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
            <div className="col">
              <label htmlFor="country" className="form-label">
                Pays
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={data.country}
                onChange={handleChange}
                required={true}
              />
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="department" className="form-label">
                Departement
              </label>
              <select
                name="department"
                id="department"
                className="form-select"
                value={data.department}
                onChange={handleChange}
                required={true}
                defaultChecked={""}
              >
                <option value={""} disabled>
                  Sélectionner un departement
                </option>
                {departments &&
                  departments.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
            <div className="col">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <input
                type="text"
                className="form-control"
                id="role"
                name="role"
                value={data.role}
                onChange={handleChange}
                required={true}
              />
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Link to="/workers" className="btn btn-danger me-2">
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
