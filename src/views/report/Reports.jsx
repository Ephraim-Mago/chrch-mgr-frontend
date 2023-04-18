import { useState } from "react";
import { Link } from "react-router-dom";
import PageComponent from "../../components/core/PageComponent";
import BtnGroup from "../../components/core/BtnGroup";

export default function Reports() {
  return (
    <>
      <PageComponent title="Liste des rapports">
        <BtnGroup title="Nouveau" create={true} link="/reports/create" />
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Sujet</th>
                <th scope="col">Auteur</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>
                  <Link to="/reports/1" title="Modifier">
                    <i className="fa fa-eye text-secondary me-3"></i>
                  </Link>
                  <a href="#" title="Supprimer">
                    <i className="fa fa-trash text-danger"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </PageComponent>
    </>
  );
}
