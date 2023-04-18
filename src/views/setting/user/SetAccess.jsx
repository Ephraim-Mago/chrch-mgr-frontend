import React, { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { formCheCkValidate } from "../../../helpers";
import PageComponent from "../../../components/core/PageComponent";
import { Link, useNavigate } from "react-router-dom";
import BtnGroup from "../../../components/core/BtnGroup";
import useUser from "../../../shares/user";

export default function SetAccess() {
  const { workers } = useStateContext();
  const navigate = useNavigate();
  const { createUser } = useUser();
  const [data, setData] = useState({
    worker: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState({ __html: "" });
  const [loading, setLoading] = useState(false);

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
      if (data.password !== data.confirm_password) {
        setError({ __html: "Mot de passe incorrecte" });
        return;
      }

      setLoading(true);

      (async () => {
        const payload = { ...data };
        delete payload.confirm_password;

        (await createUser(payload))
          ? navigate("/settings/users")
          : setLoading(false);
      })();
    }
  };

  return (
    <>
      <PageComponent title="Attribuer un accès">
        <BtnGroup link="/settings/users" title="Back" />
        {error.__html && (
          <div
            className="alert alert-danger"
            role="alert"
            dangerouslySetInnerHTML={error}
          ></div>
        )}

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="form-group mb-3">
            <label htmlFor="worker" className="form-select-label">
              Ouvrier
            </label>
            <select
              id="worker"
              className="form-select"
              name="worker"
              value={data.worker}
              onChange={handleChange}
              required={true}
              defaultChecked={""}
            >
              <option value={""} disabled>
                Sélectionner un ouvrier
              </option>
              {workers &&
                workers.map((item) => (
                  <option key={item._id} value={item._id}>
                    {`${item.firstName} ${item.lastName}`}
                  </option>
                ))}
            </select>

            <div className="invalid-feedback">Ce champ est obligatoire.</div>
          </div>

          <div className="row mb-3">
            <div className="col form-group">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={data.password}
                onChange={handleChange}
                required={true}
              />

              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>

            <div className="col form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirmPassword"
                className="form-control"
                value={data.confirm_password}
                onChange={handleChange}
                required={true}
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
