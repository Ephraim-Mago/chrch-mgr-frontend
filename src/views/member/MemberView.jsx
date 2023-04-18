import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import PageComponent from "../../components/core/PageComponent";
import BtnGroup from "../../components/core/BtnGroup";
import { formCheCkValidate } from "../../helpers";
import useMember from "../../shares/member";
import { useStateContext } from "../../contexts/ContextProvider";

export default function MemberView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workers } = useStateContext();
  const { findMember, updateMember, createMember } = useMember();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    town: "",
    city: "",
    country: "",
    workers: [],
    notice: "F",
    church_apt: "",
  });
  const [error, setError] = useState({ __html: "" });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const options = workers.map((worker) => {
    return {
      value: worker._id,
      label: `${worker.firstName} ${worker.lastName}`,
    };
  });

  const setSelected = (value) => {
    setData({
      ...data,
      workers: value,
    });
  };

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
      const payload = {
        ...data,
        workers: data.workers.map((item) => item.value),
      };

      id
        ? (async () => {
            (await updateMember(id, payload))
              ? navigate("/members")
              : setLoading(false);
          })()
        : (async () => {
            (await createMember(payload))
              ? navigate("/members")
              : setLoading(false);
          })();
    }
  };

  useEffect(() => {
    if (id) {
      setShow(true);

      (async () => {
        let response = await findMember(id);
        setData({
          ...response,
          workers: response.workers.map((worker) => {
            return {
              value: worker._id,
              label: `${worker.firstName} ${worker.lastName}`,
            };
          }),
        });

        setTimeout(() => {
          setShow(false);
        }, 1000);
      })();
    }
  }, []);

  return (
    <>
      <PageComponent
        title={id ? "Edition d'un membre" : "Création d'un membre"}
        loading={show}
      >
        <BtnGroup link="/members" title="Back" />

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
                className="form-control"
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
              <label htmlFor="churchApt" className="form-label">
                Eglise d'appartenance
              </label>
              <input
                type="text"
                className="form-control"
                id="churchApt"
                name="church_apt"
                value={data.church_apt}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
            <div className="col">
              <label className="form-label">Avis</label>
              <div className="d-flex">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="notice"
                    id="flexRadioDefault1"
                    value="F"
                    onChange={handleChange}
                    checked={data.notice == "F"}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Favorable
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="notice"
                    id="flexRadioDefault2"
                    value="NF"
                    onChange={handleChange}
                    checked={data.notice == "NF"}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Non Favorable
                  </label>
                </div>
              </div>
              <div className="invalid-feedback">Ce champ est obligatoire.</div>
            </div>
          </div>
          {id && (
            <div className="mb-3">
              <label className="form-label">Canaux</label>
              <MultiSelect
                options={options}
                value={data.workers}
                onChange={setSelected}
                labelledBy="Select"
              />
            </div>
          )}

          <div className="d-flex justify-content-end">
            <Link to="/members" className="btn btn-danger me-2">
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
