import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import Navbar from "../components/Navbar.jsx";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseCard from "../components/ExpenseCard.jsx";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchExpenses = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", user.id)
      .order("expense_date", { ascending: false });
    if (!error) setExpenses(data || []);
  };

  const addExpense = async (values) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("expenses").insert([{ ...values, user_id: user.id }]);
    if (error) alert(error.message);
    else fetchExpenses();
  };

  const updateExpense = async (values) => {
    const { error } = await supabase.from("expenses").update(values).eq("id", editing.id);
    if (error) alert(error.message);
    else {
      setEditing(null);
      fetchExpenses();
    }
  };

  const deleteExpense = async (id) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const total = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar authed />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold my-4">My Expense Dashboard</h1>

        <div className="stats shadow w-full mb-6">
          <div className="stat">
            <div className="stat-title">Total Expenses Amount</div>
            <div className="stat-value">${total.toFixed(2)}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Number of Expenses</div>
            <div className="stat-value">{expenses.length}</div>
          </div>
        </div>

        <ExpenseForm
          onSubmit={editing ? updateExpense : addExpense}
          editing={editing}
          onCancel={() => setEditing(null)}
        />

        <h2 className="text-2xl font-bold mb-3">My Expense List</h2>
        {expenses.length === 0 ? (
          <div className="alert">No expenses yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expenses.map((e) => (
              <ExpenseCard
                key={e.id}
                expense={e}
                onEdit={setEditing}
                onDelete={deleteExpense}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}