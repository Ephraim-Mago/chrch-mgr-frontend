import { useEffect } from "react";

export default function MemberModal({ edit = false, data = {} }) {
  useEffect(() => {
    if (edit) {
      console.log("Mode Edition");
    }
  }, [edit]);

  return (
    <>
      {/* Modal Member */}
      <div
        className="modal fade"
        id="memberModal"
        tabIndex="-1"
        aria-labelledby="memberModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="memberModalLabel">
                {edit ? "Edition" : "Création"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
