import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    accept: false,
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
    setLoading(false);
    setError({ __html: "" });

    for (const property in user) {
      if (user[property] === "")
        return setError({ __html: `Veuillez remplir tous les champs` });
    }

    if (user.password != user.confirm_password)
      return setError({ __html: `Le mot de passe est incorrect` });

    if (user.accept != true)
      return setError({
        __html: `Veuillez accepter les termes et conditions pour continuer`,
      });

    setLoading(true);
    console.log(user);

    /* axiosClient
      .post("/auth/register", {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
      })
      .then(({ data }) => {
        setTimeout(() => {
          setCurrentUser(data.user);
          setUserToken(data.access_token);
          showToast("Connexion réussi. Bienvenue !");
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          const finalErrors = Object.values(err.response.data.errors).reduce(
            (ac, nx) => [...ac, ...nx],
            []
          );
          console.log(finalErrors);
          setError({ __html: finalErrors.join("<br>") });
        }
      }); */
  };

  return (
    <>
      <div className="container shadow my-5">
        <div className="row justify-content-between">
          <div className="col-md-5 d-flex flex-column align-items-center justify-content-center bg-dark text-white text-center order-2 p-5">
            <h1 className="display-4 fw-bolder">Salut !</h1>
            <p className="lead">Entrez vos coordonnées pour vous inscrire</p>
            <h5 className="mb-4">OU</h5>
            <Link
              to="/login"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              Connectez-vous
            </Link>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">S'enregistrer</h1>
            {error.__html && (
              <div
                className="alert alert-danger"
                role="alert"
                dangerouslySetInnerHTML={error}
              ></div>
            )}
            <form method="POST" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="first-name" className="form-label">
                    Prénom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="first-name"
                    name="first_name"
                    value={user.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="last-name" className="form-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="last-name"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
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
                />
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
              <div className="mb-3">
                <label htmlFor="password-confirm" className="form-label">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password-confirm"
                  name="confirm_password"
                  value={user.confirm_password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  name="accept"
                  checked={user.accept}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  J'accepte les termes et conditions.
                </label>
              </div>
              <button type="submit" className="btn btn-outline-dark w-100 mt-4">
                Créer mon compte
                {loading && (
                  <div
                    className="spinner-border text-primary ms-3"
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
