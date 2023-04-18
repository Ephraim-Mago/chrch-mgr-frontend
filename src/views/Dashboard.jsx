import PageComponent from "../components/core/PageComponent";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarChart from "../components/charts/BarChart";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const datasets = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];

  const [chartData, setChartData] = useState({
    labels: datasets.map((data) => data.year),
    datasets: [
      {
        label: "Personnes gagnés ",
        data: datasets.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "&quot;#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    Chart.register(CategoryScale);
  });

  return (
    <>
      <PageComponent title="Dashboard">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Bienvenue !</h1>
            <p className="col-md-8 fs-4">...</p>

            <Link to="/members/create" className="btn btn-primary btn-lg">
              Enregistrer un nouveau fidèle
            </Link>
          </div>
        </div>

        <BarChart
          chartData={chartData}
          title="Statistique de l'évangelisation"
          text="Personnes gagnés entre 2016-2020"
        />

        {/* <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-bg-dark rounded-3">
              <h2>Accès rapide</h2>
              <p>...</p>
              <button className="btn btn-outline-light" type="button">
                Menu
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-body-tertiary border rounded-3">
              <h2>Accès rapide</h2>
              <p>...</p>
              <button className="btn btn-outline-secondary" type="button">
                Menu
              </button>
            </div>
          </div>
        </div> */}
      </PageComponent>
    </>
  );
}
