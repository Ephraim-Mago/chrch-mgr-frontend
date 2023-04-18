import React, { useEffect, useState } from "react";
import PageComponent from "../../components/core/PageComponent";
import { useParams } from "react-router-dom";
import BtnGroup from "../../components/core/BtnGroup";
import useMember from "../../shares/member";

export default function MemberDetails() {
  const { id } = useParams();
  const { findMember, canaux } = useMember();
  const [data, setData] = useState({});
  const [show, setShow] = useState(true);

  useEffect(() => {
    (async () => {
      let response = await findMember(id);
      setData(response);

      setTimeout(() => {
        setShow(false);
      }, 2000);
    })();
  }, []);

  return (
    <>
      <PageComponent title="Details du membre" loading={show}>
        <BtnGroup link="/members" title="Back" />

        <section className="pt-3">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <p className="fw-bold">{`${data.firstName} ${data.lastName}`}</p>
              <p>
                Avis :{" "}
                <span
                  className={`badge text-bg-${
                    data.notice === "F" ? "success" : "warning"
                  }`}
                >
                  {data.notice}
                </span>
              </p>
            </div>
            <div className="card-body">
              <div className="row">
                <h5 className="col card-title fw-bold">
                  Prénom : {data.firstName}
                </h5>
                <h5 className="col card-title fw-bold">
                  Nom : {data.lastName}
                </h5>
              </div>
              <h6 class="card-subtitle mb-5 text-body-secondary">
                Eglise d'appartenance : {data.church_apt}
              </h6>

              <p className="card-text">Adresse e-mail : {data.email}</p>
              <p className="card-text">Téléphone : {data.phone}</p>
              <p className="card-text">Adresse : {data.address}</p>
              <p className="card-text">Commune : {data.town}</p>
              <p className="card-text">Ville : {data.city}</p>
              <p className="card-text">Pays : {data.country}</p>
            </div>
            <div className="card-footer">Canaux : {canaux(data.workers)}</div>
          </div>
        </section>
      </PageComponent>
    </>
  );
}
