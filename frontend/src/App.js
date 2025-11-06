import { useEffect, useState } from "react";
import axios from "axios";
import SessionForm from "./components/SessionForm";
import SessionList from "./components/SessionList";
import StatsChart from "./components/StatsChart";
import SubjectProgressChart from "./components/SubjectProgressChart";

export default function App() {
  const [sessions, setSessions] = useState([]);
  const [filters, setFilters] = useState({ subject: "", from: "", to: "" });

  const load = async () => {
    const params = {};
    if (filters.subject) params.subject = filters.subject;
    if (filters.from) params.from = filters.from;
    if (filters.to) params.to = filters.to;
    const { data } = await axios.get("/api/sessions", { params });
    setSessions(data);
  };

  useEffect(() => { load(); }, []); // initial

  const addSession = async (payload) => {
    const { data } = await axios.post("/api/sessions", payload);
    setSessions((p) => [...p, data]);
  };

  const removeSession = async (id) => {
    await axios.delete(`/api/sessions/${id}`);
    setSessions((p) => p.filter((s) => s._id !== id));
  };

  const totalHours = sessions.reduce((a, c) => a + Number(c.hours || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-indigo-700">🎓 StudyTracker</h1>
          <div className="text-gray-600">Total Hours: <b>{totalHours}</b></div>
        </header>

        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Add Study Session</h2>
          <SessionForm onAdd={addSession} />
        </div>

        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className="border rounded p-2 flex-1"
              placeholder="Filter by subject"
              value={filters.subject}
              onChange={(e) =>
                setFilters((f) => ({ ...f, subject: e.target.value }))
              }
            />
            <input
              type="date"
              className="border rounded p-2"
              value={filters.from}
              onChange={(e) =>
                setFilters((f) => ({ ...f, from: e.target.value }))
              }
            />
            <input
              type="date"
              className="border rounded p-2"
              value={filters.to}
              onChange={(e) =>
                setFilters((f) => ({ ...f, to: e.target.value }))
              }
            />
            <button
              onClick={load}
              className="bg-gray-800 text-white rounded px-4 py-2 hover:bg-gray-900"
            >
              Apply Filters
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Sessions</h2>
          <SessionList sessions={sessions} onDelete={removeSession} />
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <StatsChart sessions={sessions} />
        </div>
        <SubjectProgressChart />
      </div>
    </div>
  );
}
