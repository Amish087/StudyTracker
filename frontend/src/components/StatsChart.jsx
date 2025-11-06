import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatsChart({ sessions }) {
  const subjects = [...new Set(sessions.map((s) => s.subject))];
  const totals = subjects.map(
    (sub) =>
      sessions
        .filter((s) => s.subject === sub)
        .reduce((acc, cur) => acc + Number(cur.hours || 0), 0)
  );

  if (!subjects.length)
    return <p className="text-gray-500 text-center">Add sessions to see the chart.</p>;

  const data = {
    labels: subjects,
    datasets: [
      {
        label: "Total Study Hours",
        data: totals,
        backgroundColor: "rgba(99, 102, 241, 0.7)",
        borderRadius: 10
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "📚 Study Hours by Subject" }
    },
    scales: { y: { beginAtZero: true } }
  };

  return <Bar data={data} options={options} />;
}
