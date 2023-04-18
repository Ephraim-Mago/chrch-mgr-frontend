import { Link } from "react-router-dom";

export default function BtnGroup({ create, link, title, color = "primary" }) {
  return (
    <>
      <div className="d-flex justify-content-end align-items-center pb-2">
        <div className="btn-group">
          {title && (
            <Link to={link} className={`btn btn-sm btn-${color}`}>
              {create ? (
                <i className="fa fa-folder-open-o me-2" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-arrow-left me-2" aria-hidden="true"></i>
              )}
              {title}
            </Link>
          )}
          <button className={`btn btn-sm btn-outline-${color}`}>
            <i className="fa fa-file-archive-o me-2" aria-hidden="true"></i>
            Exporter
          </button>
        </div>
      </div>
    </>
  );
}
