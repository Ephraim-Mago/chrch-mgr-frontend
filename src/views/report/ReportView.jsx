import { Link, useParams } from "react-router-dom";
import PageComponent from "../../components/core/PageComponent";
import BtnGroup from "../../components/core/BtnGroup";
import { useState } from "react";
import { formCheCkValidate } from "../../helpers";

export default function ReportView() {
  const { id } = useParams();
  const [data, setData] = useState({
    subject: "",
    content: "",
    more_info: "",
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
      setLoading(true);
      console.log("OK");
      console.log(data);
    }
    /* Array.from(forms).forEach((form) => {
      if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add("was-validated");
        return;
      }

      setLoading(true);
      console.log("OK");
      console.log(data);
    }); */
  };

  return (
    <>
      <PageComponent
        title={id ? "Detail d'un rapport" : "Création d'un rapport"}
      >
        <BtnGroup link="/reports" title="Back" />

        {error.__html && (
          <div
            className="alert alert-danger"
            role="alert"
            dangerouslySetInnerHTML={error}
          ></div>
        )}

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">
              Sujet
            </label>
            <input
              type="text"
              className="form-control"
              id="subject"
              name="subject"
              value={data.subject}
              onChange={handleChange}
              required={true}
              readOnly={id && true}
            />
            <div className="invalid-feedback">Ce champ est obligatoire.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Contenus
            </label>
            <textarea
              name="content"
              id="content"
              className="form-control"
              cols="30"
              rows="5"
              value={data.content}
              onChange={handleChange}
              readOnly={id && true}
            ></textarea>
            <div className="invalid-feedback">Ce champ est obligatoire.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="moreInfo" className="form-label">
              Autres informations
            </label>
            <textarea
              name="more_info"
              id="moreInfo"
              className="form-control"
              cols="30"
              rows="3"
              value={data.more_info}
              onChange={handleChange}
              readOnly={id && true}
            ></textarea>
            <div className="invalid-feedback">Ce champ est obligatoire.</div>
          </div>

          {!id && (
            <div className="d-flex justify-content-end">
              <Link to="/reports" className="btn btn-danger me-2">
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
          )}
        </form>
      </PageComponent>
    </>
  );
}
