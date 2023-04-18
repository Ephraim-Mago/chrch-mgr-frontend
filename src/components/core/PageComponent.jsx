import { useEffect } from "react";

export default function PageComponent({ title, children, loading = false }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center pt-5 mt-5">
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h3 className="mt-2">{title}</h3>
          <div className="container-fluid py-3">{children}</div>
        </>
      )}
    </>
  );
}
