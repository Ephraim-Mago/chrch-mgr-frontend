import { Bar } from "react-chartjs-2";

export default function BarChart({ chartData, title, text }) {
  return (
    <>
      <div className="container-fluid">
        <h2 style={{ textAlign: "center" }}>{title}</h2>
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: text,
              },
              legend: {
                display: false,
              },
            },
          }}
          width="900"
          height="380"
          className="my-4 w-100"
        ></Bar>
      </div>
    </>
  );
}
