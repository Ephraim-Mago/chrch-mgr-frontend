import { Link, useParams, useNavigate } from "react-router-dom";
import PageComponent from "../../components/core/PageComponent";
import BtnGroup from "../../components/core/BtnGroup";
import { useEffect, useState } from "react";
import { formCheCkValidate } from "../../helpers";
import useDepartment from "../../shares/department";

export default function DepartmentView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { findDepartment, createDepartment, updateDepartment } =
    useDepartment();
  const [data, setData] = useState({
    name: "",
    description: "",
    role: "",
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
            (await updateDepartment(id, data))
              ? navigate("/departments")
              : setLoading(false);
          })()
        : (async () => {
            (await createDepartment(data))
              ? navigate("/departments")
              : setLoading(false);
          })();
    }
  };

  useEffect(() => {
    if (id) {
      setShow(true);

      (async () => {
        let response = await findDepartment(id);
        // console.log(response.data);
        setData({ ...data, ...response });

        setTimeout(() => {
          setShow(false);
        }, 1000);
      })();
    }
  }, []);

  return (
    <>
      <PageComponent
        title={id ? "Edition d'un departement" : "Création d'un departement"}
        loading={show}
      >
        <BtnGroup link="/departments" title="Back" />

        {error.__html && (
          <div
            className="alert alert-danger"
            role="alert"
            dangerouslySetInnerHTML={error}
          ></div>
        )}

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nom
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required={true}
            />
            <div className="invalid-feedback">Ce champ est obligatoire.</div>
          </div>
          <div className="mb-3">
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
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              cols="30"
              rows="3"
              value={data.description}
              onChange={handleChange}
              // required={true}
            ></textarea>
            <div className="invalid-feedback">Ce champ est obligatoire.</div>
          </div>

          <div className="d-flex justify-content-end">
            <Link to="/departments" className="btn btn-danger me-2">
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
