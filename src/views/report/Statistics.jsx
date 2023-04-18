import { useEffect, useState } from "react";
import PageComponent from "../../components/core/PageComponent";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarChart from "../../components/charts/BarChart";

export default function Statistics() {
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

  const data = {
    labels: ["Red", "Orange", "Blue"],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Popularity of colours",
        data: [55, 23, 96],
        // you can set indiviual colors for each bar
        backgroundColor: [
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const [chartData, setChartData] = useState({
    labels: datasets.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
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
      <PageComponent title="Statistiques">
        <div className="d-flex align-items-start mb-4">
          <p className="fw-bold">Filtre :</p>
          <div className="mx-3">
            <label htmlFor="start_date" className="form-label">
              Date de début
            </label>
            <input
              type="date"
              className="form-control"
              name="start_date"
              id="start_date"
            />
          </div>
          <div>
            <label htmlFor="end_date" className="form-label">
              Date de fin
            </label>
            <input
              type="date"
              className="form-control"
              name="end_date"
              id="end_date"
            />
          </div>
          <button className="btn btn-primary btn-sm ms-3">
            <i className="fa fa-search fa-2x" aria-hidden="true"></i>
          </button>
        </div>
        <BarChart
          chartData={chartData}
          title="Statistique de l'évangelisation"
          text="Personnes gagnés entre 2016-2020"
        />
      </PageComponent>
    </>
  );
}
