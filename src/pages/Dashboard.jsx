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
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthTotal = expenses
    .filter((expense) => expense.expense_date?.startsWith(currentMonth))
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const topCategory = Object.entries(
    expenses.reduce((categories, expense) => {
      categories[expense.category] = (categories[expense.category] || 0) + Number(expense.amount || 0);
      return categories;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0];
  const recentExpenses = expenses.slice(0, 4);

  return (
    <div className="min-h-screen dashboard-shell">
      <Navbar authed />
      <main className="max-w-6xl mx-auto px-4 py-7 sm:px-6 lg:py-10">
        <section className="dashboard-hero mb-7">
          <div>
            <p className="eyebrow">Personal finance overview</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Your spending, at a glance.</h1>
            <p className="mt-2 text-base-content/65">Keep each expense organized and make every day count.</p>
          </div>
          <div className="hero-total">
            <span>All-time spending</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="metric-card metric-card-primary">
            <span className="metric-label">This month</span>
            <strong>${monthTotal.toFixed(2)}</strong>
            <small>Spending in {new Date().toLocaleString("default", { month: "long" })}</small>
          </div>
          <div className="metric-card">
            <span className="metric-label">Transactions</span>
            <strong>{expenses.length}</strong>
            <small>{expenses.length === 1 ? "Expense recorded" : "Expenses recorded"}</small>
          </div>
          <div className="metric-card">
            <span className="metric-label">Top category</span>
            <strong className="text-2xl">{topCategory?.[0] || "—"}</strong>
            <small>{topCategory ? `$${topCategory[1].toFixed(2)} total` : "Start adding expenses"}</small>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-6 items-start mb-10">
          <ExpenseForm
            onSubmit={editing ? updateExpense : addExpense}
            editing={editing}
            onCancel={() => setEditing(null)}
          />

          <aside className="recent-panel">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="eyebrow">Latest activity</p>
                <h2 className="text-xl font-bold">Recent expenses</h2>
              </div>
              <span className="badge badge-outline">{recentExpenses.length} recent</span>
            </div>
            {recentExpenses.length ? (
              <div className="space-y-3">
                {recentExpenses.map((expense) => (
                  <div className="recent-expense" key={expense.id}>
                    <div className="recent-expense-mark">{expense.category?.charAt(0) || "E"}</div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold truncate">{expense.title}</p>
                      <p className="text-sm text-base-content/55">{expense.category} · {expense.expense_date}</p>
                    </div>
                    <strong>${Number(expense.amount).toFixed(2)}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">Your newest expenses will appear here.</div>
            )}
          </aside>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <p className="eyebrow">All records</p>
              <h2 className="text-2xl font-bold">Expense history</h2>
            </div>
            <span className="text-sm text-base-content/55">{expenses.length} total entries</span>
          </div>
          {expenses.length === 0 ? (
            <div className="empty-state text-center py-12">No expenses yet. Add your first entry above.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {expenses.map((e) => (
                <ExpenseCard key={e.id} expense={e} onEdit={setEditing} onDelete={deleteExpense} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
