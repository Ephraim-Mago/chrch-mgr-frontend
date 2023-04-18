import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../axios";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Login() {
  const { setUserToken, notify } = useStateContext();
  const [user, setUser] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState({ __html: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (ev) => {
    const { name } = ev.target;
    const value =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    for (const property in user) {
      if (user[property] === "") {
        return setError({ __html: `Veuillez remplir tous les champs` });
      }
    }

    setLoading(true);
    apiClient
      .post("/auth/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (!response.data) {
          setLoading(false);
          setError({ __html: response.response.data.message });
          return;
        }

        setTimeout(() => {
          setUserToken(response.data.token);
          notify("Vous etes connecté");
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (ac, nx) => [...ac, ...nx],
            []
          );
          console.log(finalErrors);
          setError({ __html: finalErrors.join("<br>") });
        }
      });
  };

  return (
    <>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center justify-content-center bg-dark text-white text-center p-5">
            <h1 className="display-4 fw-bolder">Content de vous revoir</h1>
            <p className="lead">Entrez vos identifiants pour vous connecter</p>
            {/* <h5 className="mb-4">OU</h5>
            <Link
              to="/register"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              Créer un compte
            </Link> */}
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Connexion</h1>
            {error.__html && (
              <div
                className="alert alert-danger"
                role="alert"
                dangerouslySetInnerHTML={error}
              ></div>
            )}
            <form method="POST" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  Nous ne partagerons jamais votre e-mail avec quelqu'un
                  d'autre.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                  name="remember"
                  checked={user.remember}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="remember">
                  Se souvenir de moi
                </label>
              </div>
              <button type="submit" className="btn btn-dark w-100 mt-4">
                Se connecter
                {loading && (
                  <div
                    className="spinner-border text-light ms-3"
                    style={{ width: "1rem", height: "1rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
