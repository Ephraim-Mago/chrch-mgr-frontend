import React, { useEffect, useState } from "react";

export default function Pagination({
  paginateLimit = 3,
  data = [],
  setData = () => {},
}) {
  const [itemsPerPage] = useState(paginateLimit);
  const [totalItems] = useState(Math.ceil(data.length / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pageNumbers = [];

  for (let i = 1; i <= totalItems; i++) {
    pageNumbers.push(i);
  }

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      paginate(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== totalItems) {
      paginate(currentPage + 1);
    }
  };

  useEffect(() => {
    setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage]);

  useEffect(() => {
    setData(currentItems);
  }, [currentItems, paginate]);

  useEffect(() => {
    setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem));
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {/* Affichage de 1 à 1 sur 2 résultats */}
          <p className="fs-6 text-secondary">
            Affichage de <span className="fw-medium">{currentPage}</span> à{" "}
            <span className="fw-medium">{totalItems}</span> sur{" "}
            <span className="fw-medium">{data.length}</span> résultats
          </p>
        </div>
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                onClick={previousPage}
                style={{ cursor: "pointer" }}
              >
                Previous
              </a>
            </li>
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
              >
                <a
                  className="page-link"
                  onClick={() => paginate(number)}
                  style={{ cursor: "pointer" }}
                >
                  {number}
                </a>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalItems ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                onClick={nextPage}
                style={{ cursor: "pointer" }}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
