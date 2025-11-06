import { useState } from "react";

export default function SessionForm({ onAdd }) {
  const [form, setForm] = useState({ subject: "", hours: "", date: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!form.subject || !form.hours || !form.date) return;
    onAdd({
      subject: form.subject.trim(),
      hours: Number(form.hours),
      date: form.date
    });
    setForm({ subject: "", hours: "", date: "" });
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
      <input
        className="border rounded p-2"
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <input
        className="border rounded p-2"
        type="number"
        min="0"
        step="0.25"
        placeholder="Hours"
        value={form.hours}
        onChange={(e) => setForm({ ...form, hours: e.target.value })}
      />
      <input
        className="border rounded p-2"
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white rounded p-2 hover:bg-indigo-700"
      >
        ➕ Add Session
      </button>
    </form>
  );
}
