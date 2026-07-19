import { useState, useEffect } from "react";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Education", "Entertainment", "Other"];

export default function ExpenseForm({ onSubmit, editing, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    expense_date: new Date().toISOString().slice(0, 10),
    description: "",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || "",
        amount: editing.amount || "",
        category: editing.category || "Food",
        expense_date: editing.expense_date || new Date().toISOString().slice(0, 10),
        description: editing.description || "",
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ ...form, amount: parseFloat(form.amount) });
    if (!editing) {
      setForm({
        title: "",
        amount: "",
        category: "Food",
        expense_date: new Date().toISOString().slice(0, 10),
        description: "",
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow mb-6">
      <div className="card-body">
        <h2 className="card-title">{editing ? "Update Expense" : "Add Expense"}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input input-bordered w-full" required />
          <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} placeholder="Amount" className="input input-bordered w-full" required />
          <select name="category" value={form.category} onChange={handleChange} className="select select-bordered w-full">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input name="expense_date" type="date" value={form.expense_date} onChange={handleChange} className="input input-bordered w-full" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="textarea textarea-bordered w-full md:col-span-2" />
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="btn btn-primary">{editing ? "Update" : "Add"}</button>
            {editing && <button type="button" onClick={onCancel} className="btn">Cancel</button>}
          </div>
        </form>
      </div>
    </div>
  );
}