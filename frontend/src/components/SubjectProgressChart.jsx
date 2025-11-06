import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SubjectProgressChart() {
  const [subject, setSubject] = useState("");
  const [data, setData] = useState([]);

  const loadData = async () => {
    if (!subject) return;
    const res = await axios.get(`/api/sessions?subject=${subject}`);
    // sort by date
    const sessions = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
    setData(sessions);
  };

  const labels = data.map((s) => s.date);
  const hours = data.map((s) => s.hours);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${subject} Study Hours`,
        data: hours,
        fill: false,
        borderColor: "rgb(99,102,241)",
        backgroundColor: "rgba(99,102,241,0.6)",
        tension: 0.3,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `📈 Daily Study Progress for ${subject}`,
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Hours" },
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Subject Progress Chart</h2>
      <div className="flex gap-2">
        <input
          type="text"
          className="border rounded p-2 flex-1"
          placeholder="Enter subject name (e.g. DSA)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button
          onClick={loadData}
          className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700"
        >
          Show Chart
        </button>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center">Enter a subject to see progress.</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}
