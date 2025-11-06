export default function SessionList({ sessions, onDelete }) {
  if (!sessions.length)
    return <p className="text-gray-500">No study sessions yet.</p>;

  return (
    <ul className="divide-y">
      {sessions.map((s) => (
        <li key={s._id} className="flex items-center justify-between py-2">
          <div className="text-sm sm:text-base">
            <span className="font-medium">📘 {s.subject}</span>{" "}
            — {s.hours}h on {s.date}
          </div>
          <button
            onClick={() => onDelete(s._id)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            ✖ Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
