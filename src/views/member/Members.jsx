import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageComponent from "../../components/core/PageComponent";
import MemberModal from "../../components/modals/MemberModal";
import BtnGroup from "../../components/core/BtnGroup";
import useMember from "../../shares/member";
import { useStateContext } from "../../contexts/ContextProvider";
import Pagination from "../../components/core/Pagination";

export default function Members() {
  const { members } = useStateContext();
  const { allMembers, deleteMember, canaux } = useMember();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteMember(id);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    allMembers();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <PageComponent title="Liste des membres" loading={loading}>
        <BtnGroup title="Nouveau" create={true} link="/members/create" />
        {data && (
          <>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Téléphone</th>
                    <th scope="col">Avis</th>
                    <th scope="col">Canaux</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((member, i) => (
                    <tr key={member._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{member.firstName}</td>
                      <td>{member.lastName}</td>
                      <td>{member.phone ? member.phone : "Aucune"}</td>
                      <td>{member.notice}</td>
                      <td>{canaux(member.workers)}</td>
                      <td>
                        <Link
                          to={`/members/view/${member._id}`}
                          title="Voir plus"
                        >
                          <i className="fa fa-eye text-secondary"></i>
                        </Link>
                        <Link to={`/members/${member._id}`} title="Modifier">
                          <i className="fa fa-edit text-primary mx-3"></i>
                        </Link>
                        <a
                          onClick={() => handleDelete(member._id)}
                          title="Supprimer"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination paginateLimit={10} data={members} setData={setData} />
          </>
        )}
      </PageComponent>
    </>
  );
}
